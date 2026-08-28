Small, reusable helper functions that don't belong to a specific feature.
Reused in multiple places, self-contained responsibility.

### Example files:

- date.ts
- validation.ts
- string.ts

### Example code:

```js
export function formatDate(date) {}
```

OR

```js
export function isValidEmail(email) {}
```

OR

```js
export function capitalize(text: string) {
    return text[0].toUpperCase() + text.slice(1);
}
```
