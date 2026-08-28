# fullstack-practice

### Running

- create both an `app_name` and `app_name_test` database
- create `.env` and `.env.test` in root
- npm i
- npm run dev _(custom script)_
- http://localhost:5173/

### Files

- **.jsx**: PascalCase
- **.js**: camelCase
- **.sql**: snake_case

### Typing

- only type the expected successful `return` data type
- create a custom `type interface` for objects/JSON
- only type what's not infered (`any` or `unknown` when hovering)
- don't type the vars within `async` functions
- type the format if `req.body` or `res.body` is used (`Request<{}, {}, ...>` or `Response<...>`)

### Testing

- all functions, components with behavior, and HTTP endpoints
- usually from the following dir:

```
client
  ├── components
  ├── context
  ├── hooks
  ├── routes
  └── utils
server
  ├── controllers
  ├── middleware
  ├── routes
  ├── services
  └── utils
```

### Request Flow

```
Browser
    │
    ▼
React Page
    │
    ▼
Service Frontend (fetch)
    │
    ▼
Express Route
    │
    ▼
Controller
    │
    ▼
Service Backend (business logic)
    │
    ▼
Database
    │
    ▼
Controller [sets HTTP status]
    │
    ▼
JSON Response [throws error if status = 400+]
    │
    ▼
React Component [catches error]
```

### Status Codes

```
                            Reason:
200 OK                      After GET, POST, PATCH, PUT, DELETE
201 Created                 After POST
204 No Content              After PATCH, PUT, DELETE
400 Bad Request             Invalid request from the client
401 Unauthorized            Authentication required or invalid credentials
403 Forbidden               Authenticated but not allowed
404 Not Found               Resource not found
409 Conflict                Duplicate email, username taken, etc.
500 Internal Server Error   Unexpected server/database error
```

### Request/Response Headers

```
                                    Data type:
application/json                    JSON
multipart/form-data                 File upload
text/plain                          Plain text
text/html                           HTML
application/x-www-form-urlencoded   URL-encoded forms
```

### HTTP Methods

```
            SQL query/browser action:
GET         Read data
POST        Create something
PUT         Replace an existing resource
PATCH       Partially update
DELETE      Remove
HEAD        Same as GET, but headers only
OPTIONS     Ask what methods are supported
```

### Styling

- https://tailwindcss.com/docs/colors
- https://fonts.google.com/icons?icon.set=Material%20Symbols&icon.size=24&icon.color=%23e3e3e3&icon.style=Rounded
