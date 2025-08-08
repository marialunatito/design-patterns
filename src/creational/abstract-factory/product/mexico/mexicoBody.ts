import { EmailBody } from "../../interfaces/emailBody";

export class MexicoBody implements EmailBody {
  render(): string {
    return `This is an email <body/> for Mexico 🇲🇽`;
  }
}
