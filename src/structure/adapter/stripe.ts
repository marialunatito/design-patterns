// import Stripe from "stripe";

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
// Adapter
// mapping, performs integration logic (confirm, errors, status).
export class StripePaymentAdapter implements PaymentGateway {
  private client: any; // Stripe;

  //   constructor(apiKey: string) {
  //     this.client = new Stripe(apiKey, { apiVersion: "2024-06-20" });
  //   }

  async charge(input: ChargeInput): Promise<ChargeResult> {
    try {
      // mapping
      const payment = await this.client.paymentIntents.create({
        amount: input.amountCents,
        currency: input.currency,
        payment_method: input.sourceId,
        confirm: true,
      });

      // response logic
      return { ok: payment.status === "succeeded", transactionId: payment.id };
    } catch (err: any) {
      // catch erros
      if (err.type === "StripeCardError")
        return { ok: false, reason: "card_declined" };
      return { ok: false, reason: "service_down" };
    }
  }
}
