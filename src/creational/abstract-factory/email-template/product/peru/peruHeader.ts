import { EmailHeader } from "../../interfaces/emailHeader";

export class PeruHeader implements EmailHeader {
  render(): string {
    return `This is an email <header/> for Peru 🇵🇪`;
  }
}
