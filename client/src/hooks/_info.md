Custom React hooks.

### Example files:

- useFetch.ts
- useTheme.ts

### Example code:

```js
import { useState } from "react";

export function useCounter() {
  const [count, setCount] = useState(0);

  return {
    count,
    increment: () => setCount((c) => c + 1),
  };
}
```
