# Prototype Pattern – Price Example

## Overview

This repository demonstrates the **Prototype design pattern** applied to a real-world backend use case:  
managing **Price objects** with strict business rules, such as coupon constraints, recurrence limits, and amount validations.

The Prototype pattern allows us to:

- Preconfigure **reusable prototypes** for common price types (`coupon`, `fixed`, `onetime`).
- Clone prototypes to create new price instances **without reconstructing from scratch**.
- Apply modifications to the cloned object while preserving **business invariants**.
- Keep prototypes **immutable** and **safe to reuse** across requests/tenants.

---

## Why Prototype Here?

In a production system, creating a `Price` can require:

- Multiple **validations** (type, recurrence, amount, stock, coupon activity).
- **Conditional rules** depending on the `Price` type.
- **Default configurations** that must remain consistent across the platform.

Instead of building every `Price` from scratch, we can:

1. Create **base prototypes** for each type (`couponProto`, `monthlyProto`, `onetimeProto`).
2. Clone the base object using `clone()`.
3. Apply safe modifications via **"withers"** (`withAmountCents()`, `withPercentOff()`, etc.).
4. Validate before returning the final object with `asPojo()`.

---

## Business Rules Enforced

The validation logic ensures:

- **Coupon prices**:

  - Must have `recurrence = onetime`.
  - Must have a valid coupon (active, stock > 0, not expired).
  - Must have either `amountOff` or `percentOff`.
  - `percentOff` must be between 1 and 100.

- **Fixed recurring prices**:

  - Cannot be `onetime` (enforced by TypeScript).
  - Must have a positive `unitAmountCents`.

- **One-time prices**:
  - Must have `recurrence = onetime`.
  - Must have a positive `unitAmountCents`.

---

## Code Example

```ts
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
  recurrence: Recurrence.onetime;
  coupon: CouponState;
  amountOff?: number;
  percentOff?: number;
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

const deepClone = <T>(obj: T): T => structuredClone(obj);

class PriceProto<T extends PriceModel> implements Proto<PriceProto<T>> {
  private state: T;

  constructor(base: T) {
    this.state = deepClone(base);
    this.validate(this.state);
  }

  clone(): PriceProto<T> {
    return new PriceProto<T>(deepClone(this.state));
  }

  withAmountCents(amount: number) {
    if ("unitAmountCents" in this.state) {
      this.state.unitAmountCents = amount;
    } else if (this.state.kind === PriceKind.coupon) {
      this.state.amountOff = amount;
      delete this.state.percentOff;
    }
    return this;
  }

  withPercentOff(p: number) {
    if (this.state.kind !== PriceKind.coupon)
      throw new Error("percentOff only applies to coupons");
    if (p <= 0 || p > 100) throw new Error("percentOff must be 1..100");
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

  asPojo(): T {
    this.validate(this.state);
    return deepClone(this.state);
  }

  private validate(s: PriceModel) {
    if (s.kind === PriceKind.coupon) {
      if (s.recurrence !== Recurrence.onetime)
        throw new Error("Coupon must be onetime");
      if (!s.coupon?.code) throw new Error("Coupon without code");
      if (!s.coupon.active) throw new Error("Inactive coupon");
      if (s.coupon.stock <= 0) throw new Error("Coupon out of stock");
      if (s.coupon.expiresAt && s.coupon.expiresAt.getTime() <= Date.now())
        throw new Error("Expired coupon");
      if (s.amountOff == null && s.percentOff == null)
        throw new Error("Coupon requires amountOff or percentOff");
      if (s.percentOff != null && (s.percentOff <= 0 || s.percentOff > 100))
        throw new Error("Invalid percentOff");
    }

    if (s.kind === PriceKind.fixed) {
      if (s.unitAmountCents <= 0) throw new Error("Fixed price must be > 0");
    }

    if (s.kind === PriceKind.onetime) {
      if (s.recurrence !== Recurrence.onetime)
        throw new Error("One-time price must be onetime");
      if (s.unitAmountCents <= 0) throw new Error("One-time price must be > 0");
    }
  }
}
```
