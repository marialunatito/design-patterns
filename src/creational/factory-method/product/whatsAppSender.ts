import { NotificationSender } from "./notificationSender";

export class WhatsAppSender implements NotificationSender {
  send(message: string): void {
    console.log(`💬 WhatsApp message send : ${message}`);
  }
}
