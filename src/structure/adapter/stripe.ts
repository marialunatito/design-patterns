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
