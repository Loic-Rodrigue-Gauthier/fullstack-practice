express-validator validation functions.
Executed before controllers in routes.

### Example files:

- authValidation.ts

### Example code:

```js
import { body } from "express-validator";

export const authValidation = [
  body("email").trim().isEmail(),

  body("password").isLength({ min: 8 }),
];
```

### Doc:

```js
// Types
body("email").isEmail(); // Validates fields in req.body: { "email": "test@example.com" }
param("id").isInt(); // Validates URL parameters: GET /users/123
query("page").isInt({ min: 1 }); // Validates query strings: GET /posts?page=2
cookie("theme").isIn(["light", "dark"]); // Validates cookies.
header("authorization").notEmpty(); // Validates request headers.

// Validators
.notEmpty()
.isEmail()
.isLength({ min: 8 })
.isIn(["user", "admin"]) // Enum
.matches(/^[a-zA-Z0-9]+$/) // Regex
.isString()
.isNumeric()
.isInt({ min: 18 })
.isBoolean()
.isObject()
.isArray()
.isURL()
.isUUID()

// Sanitizers
.trim()
.toLowerCase()
.escape() // Escape HTML
.toInt()
.toBoolean()

// Other
.withMessage("Invalid email address");
.bail() // like "return", use after each check/message on a same object
.custom(functionName);
```
