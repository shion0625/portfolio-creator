BEGIN;
  CREATE TABLE IF NOT EXISTS users(
    id serial PRIMARY KEY,
    is_admin BOOLEAN NOT NULL DEFAULT false,
    name VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    email VARCHAR (300) UNIQUE NOT NULL,
    is_able BOOLEAN NOT NULL DEFAULT true
  );
  CREATE INDEX on users(id);
COMMIT;
