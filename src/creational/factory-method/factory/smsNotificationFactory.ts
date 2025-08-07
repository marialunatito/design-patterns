import { NotificationSender } from "../product/notificationSender";
import { SmsSender } from "../product/smsSender";
import { NotificationFactory } from "./notificationFactory";

export class SmsNotificationFactory extends NotificationFactory {
  createSender(): NotificationSender {
    return new SmsSender();
  }
}
