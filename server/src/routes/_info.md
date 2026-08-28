Defines API endpoints.

### Example files:

- userRoutes.ts

### Example code:

```js
import { Router } from "express";
import { getUsers } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);

export default router;
```
