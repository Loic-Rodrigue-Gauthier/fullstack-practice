Receive HTTP requests and send responses.
Controllers should stay thin and delegate business logic to services.
receive the request -> validate inputs -> call a service -> send a response

### Example files:

- userController.ts

### Example code:

```js
import { Request, Response } from "express";

export function getUsers(req: Request, res: Response) {
    res.json([
        { id: 1, name: "Alice" }
    ]);
}
```
