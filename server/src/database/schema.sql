DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id              SERIAL,
  email           VARCHAR(255)  NOT NULL,
  password_hash   VARCHAR(255)  NOT NULL,

  CONSTRAINT  pk_users        PRIMARY KEY (id),
  CONSTRAINT  uc_users_email  UNIQUE (email)
);