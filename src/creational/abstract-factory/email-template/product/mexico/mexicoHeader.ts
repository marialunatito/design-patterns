import { EmailHeader } from "../../interfaces/emailHeader";

export class MexicoHeader implements EmailHeader {
  render(): string {
    return `This is an email <header/> for Mexico 🇲🇽`;
  }
}
