import { EmailBody } from "../../interfaces/emailBody";

export class PeruFooter implements EmailBody {
  render(): string {
    return `This is an email <footer/> for Peru 🇵🇪`;
  }
}
