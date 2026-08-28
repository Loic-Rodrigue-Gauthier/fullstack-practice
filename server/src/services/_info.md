Business logic.

### Example files:

- userService.ts

### Example code:

```js
import { pool } from "../database/db";

export async function getAllUsers() {
  const result = await pool.query("SELECT * FROM users");

  return result.rows;
}
```
