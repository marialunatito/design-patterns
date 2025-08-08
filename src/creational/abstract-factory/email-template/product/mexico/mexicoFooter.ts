import { EmailBody } from "../../interfaces/emailBody";

export class MexicoFooter implements EmailBody {
  render(): string {
    return `This is an email <footer/> for Mexico 🇲🇽`;
  }
}
