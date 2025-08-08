import { EmailTemplateFactory } from "./interfaces/EmailTemplateFactory";
import { MexicoEmailFactory } from "./product/mexico/EmailFactory";
import { PeruEmailFactory } from "./product/peru/EmailFactory";

function renderEmail(factory: EmailTemplateFactory) {
  const header = factory.createHeader();
  const body = factory.createBody();
  const footer = factory.createFooter();

  console.log(header.render());
  console.log(body.render());
  console.log(footer.render());
}

renderEmail(new PeruEmailFactory());
console.log(`\n----------\n`);
renderEmail(new MexicoEmailFactory());
