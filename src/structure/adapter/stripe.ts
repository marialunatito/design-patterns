// domain/ports/PaymentGateway.ts
export interface ChargeInput {
  amountCents: number;
  currency: "usd" | "pen" | "ars";
  sourceId: string;
}

export interface ChargeResult {
  ok: boolean;
  transactionId?: string;
  reason?: "card_declined" | "service_down";
}

export interface PaymentGateway {
  charge(input: ChargeInput): Promise<ChargeResult>;
}

// use case application
export class CheckoutOrder {
  constructor(private gateway: PaymentGateway) {}

  async execute(userId: string, amount: number) {
    const result = await this.gateway.charge({
      amountCents: amount * 100,
      currency: "usd",
      sourceId: "tok_visa", // ejemplo
    });

    if (!result.ok) throw new Error(`Payment failed: ${result.reason}`);
    console.log("Payment succeeded:", result.transactionId);
  }
}
