Code that communicates with the backend.
Responsible for making HTTP requests, setting headers, parsing JSON, throwing errors if the request fails

### Example files:

- apiService.ts
- authService.ts
- usersService.ts

### Example code:

```js
import { api } from "./api";

export async function getUsers() {
  const response = await api.get("/users");

  return response.data;
}
```

or

```js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});
```
