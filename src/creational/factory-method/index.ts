import { EmailNotificationFactory } from "./factory/emailNotificationFactory";
import { SmsNotificationFactory } from "./factory/smsNotificationFactory";
import { WhatsAppNotificationFactory } from "./factory/whatsAppNotificationFactory";

const emailFactory = new EmailNotificationFactory();
emailFactory.notify(`This is a message by email`);

const smsFactory = new SmsNotificationFactory();
smsFactory.notify(`This is a message by sms`);

const whatsAppNotificationFactory = new WhatsAppNotificationFactory();
whatsAppNotificationFactory.notify(`This is a message by whatsapp`);
