BEGIN;
  CREATE TABLE IF NOT EXISTS works(
    id VARCHAR (255) UNIQUE NOT NULL PRIMARY KEY,
    title VARCHAR (255) UNIQUE NOT NULL,
    summary text,
    image_url text,
    duration VARCHAR (255),
    number_of_people integer,
    language text,
    role text,
    url text NOT NULL,
    brief_story text
  );
  CREATE INDEX on works(id);
COMMIT;
