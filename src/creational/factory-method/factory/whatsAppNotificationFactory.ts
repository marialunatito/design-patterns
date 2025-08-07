import { NotificationSender } from "../product/notificationSender";
import { WhatsAppSender } from "../product/whatsAppSender";
import { NotificationFactory } from "./notificationFactory";

export class WhatsAppNotificationFactory extends NotificationFactory {
  createSender(): NotificationSender {
    return new WhatsAppSender();
  }
}

// NotificationSender is interface of product that the factory will create
