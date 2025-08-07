# 🏭 Factory Method – Notification Channels

## 👓 Definition (GoF)

Factory Method is a creational design pattern that defines an interface for creating an object, but lets subclasses decide which class to instantiate.

> “Define an interface for creating an object, but let subclasses decide which class to instantiate.”  
> — _Gang of Four, Design Patterns (1994)_

---

## 💼 Use Case: Notification Sender

In this example, we simulate a backend system that needs to send notifications via different channels: Email, SMS, WhatsApp, etc.

Each channel requires its own implementation of the sending logic, but the client code shouldn’t depend on concrete classes.

---

## 🧠 Why Use Factory Method?

- Decouples object creation from the client code
- Follows the **Dependency Inversion Principle** (DIP)
- Enables easy extension for new types of senders
- Encourages **Open/Closed Principle** — open for extension, closed for modification

---

## 🧱 Pattern Structure

```
📦 factory-method/
├── NotificationSender.ts ← Product interface
├── EmailSender.ts / SmsSender.ts ← Concrete products
├── NotificationFactory.ts ← Abstract creator (with factory method)
├── EmailNotificationFactory.ts ← Concrete creator
├── SmsNotificationFactory.ts ← Concrete creator
└── usage.ts ← Client usage
```

## ✅ Benefits

- Reduces coupling between client and concrete implementations
- Easy to add new sender types
- Clean and maintainable structure
- Can be combined with other patterns (Strategy, Template Method, etc.)

## ❌ Drawbacks

- Adds complexity with more classes
- May be overkill for very simple scenarios
