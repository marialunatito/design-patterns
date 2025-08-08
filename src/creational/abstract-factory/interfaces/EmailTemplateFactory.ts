import { EmailBody } from "./emailBody";
import { EmailFooter } from "./emailFooter";
import { EmailHeader } from "./emailHeader";

export interface EmailTemplateFactory {
  createHeader(): EmailHeader;
  createBody(): EmailBody;
  createFooter(): EmailFooter;
}
