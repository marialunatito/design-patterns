export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export interface EmailSender {
  sendEmail(payload: EmailPayload): Promise<void>;
}
