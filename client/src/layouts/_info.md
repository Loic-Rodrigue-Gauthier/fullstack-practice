Shared page layouts.

### Example files:

- MainLayout.tsx
- AdminLayout.tsx

### Example code:

```jsx
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
```
