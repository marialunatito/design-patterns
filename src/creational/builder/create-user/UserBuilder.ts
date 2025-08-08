enum RoleEnum {
  admin = "admin",
  developer = "developer",
  guest = "guest",
}

type WalletPlan = { amount: number; monthlyRecurrence: number };

interface User {
  name?: string;
  role?: RoleEnum;
  company?: string;
  wallet?: number;
  walletPlan?: WalletPlan;
}

interface UserBuilder {
  start(name: string): this;
  withWallet(wallet: number): this;
  withWalletPlan(walletPlan: {
    amount: number;
    monthlyRecurrence: number;
  }): this;
  withRole(role: RoleEnum): this;
  withCompany(company: string): this;
  build(): User;
}

class DefaultUserBuilder implements UserBuilder {
  private name?: string;
  private role?: RoleEnum;
  private company?: string;
  private wallet?: number;
  private walletPlan?: { amount: number; monthlyRecurrence: number };

  // these implements are examples, the real logic of each step would be more complex
  start(name: string): this {
    this.reset();
    this.name = name;
    console.log(`step create user run`);
    return this;
  }
  withWallet(wallet: number): this {
    this.wallet = wallet;
    console.log(`step wallet user run`);
    return this;
  }
  withWalletPlan(walletPlan: {
    amount: number;
    monthlyRecurrence: number;
  }): this {
    this.walletPlan = walletPlan;
    console.log(`step wallet plan user run`);
    return this;
  }
  withRole(role: RoleEnum): this {
    this.role = role;
    console.log(`step role user run`);
    return this;
  }
  withCompany(company: string): this {
    this.company = company;
    console.log(`step company user run`);
    return this;
  }
  build(): User {
    let message = `UserCreated \n- name: ${this.name}`;

    if (this.company) {
      message += `\n- company: ${this.company}`;
    }

    if (this.role) {
      message += `\n- role: ${this.role}`;
    }

    if (this.wallet && this.wallet > 0) {
      message += `\n- wallet: ${this.wallet}`;
    }

    if (this.walletPlan) {
      message += `\n- amount: ${this.walletPlan.amount}`;
      message += `\n- recurrence: ${this.walletPlan.monthlyRecurrence}`;
    }
    console.log(message);

    const result: User = {
      name: this.name,
      role: this.role,
      company: this.company,
      wallet: this.wallet,
      walletPlan: this.walletPlan,
    };

    return result;
  }

  private reset(): void {
    this.name = undefined;
    this.role = undefined;
    this.company = undefined;
    this.wallet = undefined;
    this.walletPlan = undefined;
  }
}

class UserDirector {
  constructor(private readonly builder: UserBuilder) {}

  // BASE
  base(name: string, role: RoleEnum, company: string) {
    return this.builder.start(name).withCompany(company).withRole(role).build();
  }

  // DEVELOPER
  developer(
    name: string,
    company: string,
    wallet: number,
    amount: number,
    monthlyRecurrence: number
  ) {
    return this.builder
      .start(name)
      .withCompany(company)
      .withRole(RoleEnum.developer)
      .withWallet(wallet)
      .withWalletPlan({ amount, monthlyRecurrence })
      .build();
  }

  // ADMIN
  admin(name: string, company: string) {
    return this.builder
      .start(name)
      .withCompany(company)
      .withRole(RoleEnum.admin)
      .build();
  }
}

const userBuilder = new DefaultUserBuilder();
const director = new UserDirector(userBuilder);

const companyName = "MaryMoon";
const wallet = 100; // USD
const walletPlanAmount = 20; // USD
const monthlyRecurrence = 1; //monthly

// User base
director.base("Maria", RoleEnum.guest, companyName);

// Admin
director.admin("Carmen", companyName);

// developers
director.developer(
  "Pamela",
  companyName,
  wallet,
  walletPlanAmount,
  monthlyRecurrence
);
