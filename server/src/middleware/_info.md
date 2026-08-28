Functions executed before controllers.

### Example files:

- authMiddleware.ts
- errorHandler.ts

### Example code:

```js
import { Request, Response, NextFunction } from "express";

export function logger(
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log(req.method, req.url);

    next();
}
```
