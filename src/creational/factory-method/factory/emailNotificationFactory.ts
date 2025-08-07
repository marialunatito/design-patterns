import { EmailSender } from "../product/emailSender";
import { NotificationSender } from "../product/notificationSender";
import { NotificationFactory } from "./notificationFactory";

export class EmailNotificationFactory extends NotificationFactory {
  createSender(): NotificationSender {
    return new EmailSender();
  }
}
