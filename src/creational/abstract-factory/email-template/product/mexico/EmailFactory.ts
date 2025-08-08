import { EmailBody } from "../../interfaces/emailBody";
import { EmailFooter } from "../../interfaces/emailFooter";
import { EmailHeader } from "../../interfaces/emailHeader";
import { EmailTemplateFactory } from "../../interfaces/EmailTemplateFactory";
import { MexicoBody } from "./mexicoBody";
import { MexicoFooter } from "./mexicoFooter";
import { MexicoHeader } from "./mexicoHeader";

export class MexicoEmailFactory implements EmailTemplateFactory {
  createHeader(): EmailHeader {
    return new MexicoHeader();
  }
  createBody(): EmailBody {
    return new MexicoBody();
  }
  createFooter(): EmailFooter {
    return new MexicoFooter();
  }
}
