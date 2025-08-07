import { NotificationSender } from "./notificationSender";

export class SmsSender implements NotificationSender {
  send(message: string): void {
    console.log(`📱 Sms send: ${message}`);
  }
}
