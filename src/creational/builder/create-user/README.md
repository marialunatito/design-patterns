# Builder Pattern – Create User Example

## Overview

This repository demonstrates the **Builder design pattern** applied to a real-world backend use case:  
creating **User objects** with different variations (base, admin, developer) while keeping the creation process flexible, readable, and maintainable.

The implementation uses:

- A **Builder interface** defining the steps to create a `User`.
- A **Concrete Builder** (`DefaultUserBuilder`) implementing the construction logic.
- A **Director** (`UserDirector`) encapsulating predefined creation flows for specific user types.

---

## Why Builder Here?

In backend systems, user creation often requires:

- **Required fields** like `name`.
- **Optional fields** like `company`, `wallet`, `walletPlan`.
- **Conditional flows** depending on the type of user (admin, developer, guest).
- A **clear separation** between the steps of building and the actual representation of the object.

Instead of having multiple constructors or a large, complex function with conditional branches,  
the Builder pattern lets us:

1. **Chain steps fluently** (`start()`, `withRole()`, `withWallet()`, etc.).
2. **Reuse the same builder** for different user creation scenarios.
3. Delegate **construction variations** to a Director for consistency.
