BEGIN;
  CREATE TABLE IF NOT EXISTS profiles(
    id VARCHAR (255) UNIQUE NOT NULL PRIMARY KEY,
    birthday TIMESTAMP,
    comment TEXT,
    user_id VARCHAR (255) NOT NULL
  );
  CREATE INDEX on profiles(id);
COMMIT;
