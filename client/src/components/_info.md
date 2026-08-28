Reusable UI pieces.
Responsible for displaying inputs, managing state, responding to user interaction.

### Example files:

- Button.tsx
- Navbar.tsx
- Card.tsx

### Example code:

```jsx
type ButtonProps = {
    children: React.ReactNode;
};

export function Button({ children }: ButtonProps) {
    return (
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
            {children}
        </button>
    );
}
```

or

```jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
```
