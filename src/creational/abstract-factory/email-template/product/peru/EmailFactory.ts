import { EmailBody } from "../../interfaces/emailBody";
import { EmailFooter } from "../../interfaces/emailFooter";
import { EmailHeader } from "../../interfaces/emailHeader";
import { EmailTemplateFactory } from "../../interfaces/EmailTemplateFactory";
import { PeruBody } from "./peruBody";
import { PeruFooter } from "./peruFooter";
import { PeruHeader } from "./peruHeader";

export class PeruEmailFactory implements EmailTemplateFactory {
  createHeader(): EmailHeader {
    return new PeruHeader();
  }
  createBody(): EmailBody {
    return new PeruBody();
  }
  createFooter(): EmailFooter {
    return new PeruFooter();
  }
}
