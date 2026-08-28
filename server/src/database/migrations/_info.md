Changes an existing database.
A migration changes the database over time.
Instead of editing schema.sql, you create a migration.
Each migration runs once.

### Example files:

- 001_create_users.sql
- 002_add_last_signin.sql
- 003_create_posts.sql

### Example code:

```sql
ALTER TABLE users
ADD COLUMN last_signin TIMESTAMP;
```
