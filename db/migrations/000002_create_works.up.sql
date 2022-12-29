BEGIN;
  CREATE TABLE IF NOT EXISTS works(
    id VARCHAR (255) UNIQUE NOT NULL PRIMARY KEY,
    title VARCHAR (255) NOT NULL,
    summary TEXT,
    image_url TEXT,
    duration VARCHAR (255),
    number_of_people integer,
    language TEXT,
    role TEXT,
    url TEXT,
    brief_story TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    is_delete bool DEFAULT FALSE,
    user_id VARCHAR (255) NOT NULL
  );
  CREATE INDEX on works(id);
COMMIT;
