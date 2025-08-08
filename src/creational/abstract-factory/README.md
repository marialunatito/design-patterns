# 🏭 Abstract Factory – Generation of email template by country

## 👓 Definition (GoF)

Abstract Factory is a creational design pattern that lets you produce families of related objects without specifying their concrete classes.

---

## 💼 Use Case: Generation of email template by country

In this example, we simulate a backend system that needs to build a template email by country.

We need to create factories by part of template and by country.

---

## 🧠 Why Use Abstract Factory?

- When need to work with various families of related products, but you don't want it to depend on the concrete classes of products.
- When you have two or more types to build something, for example families by country, by language, by type, by category, by structure, etc. You need to separate responsibilities in family from factories.
- ***

## 🧱 Pattern Structure

```
📦 abstract-factory/
├── interfaces/ (factory template email)
├── products/ (specific classes)
├── index.ts
```

## ✅ Benefits

- Reduces coupling between client and concrete implementations
- Open/Closed Principle

## ❌ Drawbacks

- The code can be complicated
