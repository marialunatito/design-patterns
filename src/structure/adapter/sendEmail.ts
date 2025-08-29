export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export interface EmailSender {
  sendEmail(payload: EmailPayload): Promise<void>;
}

// use case application
export class SendWelcomeEmail {
  constructor(private emailSender: EmailSender) {}

  async execute(email: string) {
    await this.emailSender.sendEmail({
      to: email,
      subject: "Welcome!",
      body: "Thanks for joining 🚀",
    });
  }
}

// Adapter: integration with SendGrid
export class SendGridAdapter implements EmailSender {
  constructor(private apiKey: string) {
    // sgMail.setApiKey(apiKey)
  }

  async sendEmail(payload: EmailPayload): Promise<void> {
    // here you add mapper
    const msg = {
      to: payload.to,
      from: "no-reply@myapp.com",
      subject: payload.subject,
      text: payload.body,
    };
    console.log("[SendGrid] would send:", msg);
    // await sgMail.send(msg)
  }
}

export class SendSESAdapter implements EmailSender {
  constructor(private apiKey: string) {
    // sgMail.setApiKey(apiKey)
  }

  async sendEmail(payload: EmailPayload): Promise<void> {
    // here you add mapper
    const sesInput = {
      ...payload,
      // add other fields or the fields named that other form
    };
    console.log("[SendSES] would send:", sesInput);
    // await ses.send(msg)
  }
}
