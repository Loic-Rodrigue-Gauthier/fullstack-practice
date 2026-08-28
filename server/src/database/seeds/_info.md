Adds example data.
Seeds insert initial data.
Useful for testing, demo accounts, lookup tables, development.

### Example files:

- 001_users.sql
- 002_categories.sql

### Example code:

```sql
INSERT INTO users
(username, email)
VALUES
('alice', 'alice@example.com'),
('bob', 'bob@example.com');
```

or

```sql
INSERT INTO categories
(name)
VALUES
('Books'),
('Games'),
('Movies');
```
