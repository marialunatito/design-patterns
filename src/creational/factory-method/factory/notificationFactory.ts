import { NotificationSender } from "../product/notificationSender";

export abstract class NotificationFactory {
  // the factory build a product (interfaz) that in this case is NotificationSender
  abstract createSender(): NotificationSender;

  notify(message: string): void {
    const sender = this.createSender();
    sender.send(message);
  }
}
