// domain
enum PriceKind {
  coupon = "coupon",
  fixed = "fixed",
  onetime = "onetime",
}

enum Recurrence {
  monthly = "monthly",
  bimonthly = "bimonthly",
  quarterly = "quarterly",
  annually = "annually",
  onetime = "onetime",
}

type CouponState = {
  code: string;
  active: boolean;
  stock: number;
  expiresAt?: Date;
};

type CouponPrice = {
  id: string;
  kind: PriceKind.coupon;
  recurrence: Recurrence.onetime; // rule: coupon is always onetime
  coupon: CouponState; // rule: coupon must be valid and active with stock > 0
  amountOff?: number; // fixed in cents
  percentOff?: number; // 0..100
};

type FixedRecurringPrice = {
  id: string;
  kind: PriceKind.fixed;
  recurrence: Exclude<Recurrence, Recurrence.onetime>;
  unitAmountCents: number;
};

type OneTimePrice = {
  id: string;
  kind: PriceKind.onetime;
  recurrence: Recurrence.onetime;
  unitAmountCents: number;
};

type PriceModel = CouponPrice | FixedRecurringPrice | OneTimePrice;

interface Proto<T> {
  clone(): T;
}

// utility for safe deep clone of serializable types
const deepClone = <T>(obj: T): T => structuredClone(obj);

// Generic prototype
class PriceProto<T extends PriceModel> implements Proto<PriceProto<T>> {
  private state: T;

  constructor(base: T) {
    this.state = deepClone(base);
    this.validate(this.state);
  }

  clone(): PriceProto<T> {
    return new PriceProto<T>(deepClone(this.state));
  }

  // safe withers that preserve invariants
  withAmountCents(amount: number) {
    if ("unitAmountCents" in this.state) {
      this.state.unitAmountCents = amount;
    } else if (
      this.state.kind === PriceKind.coupon &&
      typeof amount === "number"
    ) {
      this.state.amountOff = amount;
      delete this.state.percentOff;
    }
    return this;
  }

  withPercentOff(p: number) {
    if (this.state.kind !== PriceKind.coupon) {
      throw new Error("percentOff only applies to coupons");
    }
    if (p <= 0 || p > 100) throw new Error("percentOff must be in 1..100");
    this.state.percentOff = p;
    delete this.state.amountOff;
    return this;
  }

  withCoupon(code: string, active: boolean, stock: number, expiresAt?: Date) {
    if (this.state.kind !== PriceKind.coupon)
      throw new Error("Only coupons accept coupon data");
    this.state.coupon = { code, active, stock, expiresAt };
    return this;
  }

  decrementStock(n = 1) {
    if (this.state.kind !== PriceKind.coupon) return this;
    this.state.coupon.stock = Math.max(0, this.state.coupon.stock - n);
    return this;
  }

  asPojo(): T {
    this.validate(this.state);
    return deepClone(this.state);
  }

  private validate(s: PriceModel) {
    // global rules
    if (s.kind === PriceKind.coupon) {
      if (s.recurrence !== Recurrence.onetime) {
        throw new Error("A coupon must be onetime");
      }
      if (!s.coupon?.code) throw new Error("Coupon without code");
      if (!s.coupon.active) throw new Error("Inactive coupon");
      if (s.coupon.stock <= 0) throw new Error("Coupon out of stock");
      if (s.coupon.expiresAt && s.coupon.expiresAt.getTime() <= Date.now()) {
        throw new Error("Coupon expired");
      }
      if (s.amountOff == null && s.percentOff == null) {
        throw new Error("Coupon requires amountOff or percentOff");
      }
      if (s.percentOff != null && (s.percentOff <= 0 || s.percentOff > 100)) {
        throw new Error("Invalid percentOff");
      }
    }

    if (s.kind === PriceKind.fixed) {
      if (s.unitAmountCents <= 0) throw new Error("Fixed amount must be > 0");
    }

    if (s.kind === PriceKind.onetime) {
      if (s.recurrence !== Recurrence.onetime)
        throw new Error("onetime must be onetime");
      if (s.unitAmountCents <= 0) throw new Error("Onetime amount must be > 0");
    }
  }
}

function run() {
  try {
    // === “Hot” prototypes you reuse ===
    const couponProto = new PriceProto<CouponPrice>({
      id: "proto-coupon",
      kind: PriceKind.coupon,
      recurrence: Recurrence.onetime,
      coupon: { code: "BASE", active: true, stock: 100 },
      percentOff: 10,
    });

    const monthlyProto = new PriceProto<FixedRecurringPrice>({
      id: "proto-monthly",
      kind: PriceKind.fixed,
      recurrence: Recurrence.monthly,
      unitAmountCents: 2,
    });

    const onetimeProto = new PriceProto<OneTimePrice>({
      id: "proto-onetime",
      kind: PriceKind.onetime,
      recurrence: Recurrence.onetime,
      unitAmountCents: 5,
    });

    // === Usage at runtime ===

    // 1) Create a valid coupon from the prototype
    const welcome10 = couponProto
      .clone()
      .withCoupon("WELCOME10", true, 500)
      .withPercentOff(15)
      .asPojo();

    // 2) Fixed monthly price
    const planProMonthly = monthlyProto.clone().withAmountCents(2999).asPojo();

    // 3) Onetime price
    const setupFee = onetimeProto.clone().withAmountCents(9900).asPojo();

    console.log(welcome10, planProMonthly, setupFee);
  } catch (error) {
    console.error((error as Error).message);
  }
}

run();
