import { NotificationSender } from "./notificationSender";

export class EmailSender implements NotificationSender {
  send(message: string): void {
    console.log(`📧 Email send: ${message}`);
  }
}
