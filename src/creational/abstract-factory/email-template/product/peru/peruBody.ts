import { EmailBody } from "../../interfaces/emailBody";

export class PeruBody implements EmailBody {
  render(): string {
    return `This is an email <body/> for Peru 🇵🇪`;
  }
}
