BEGIN;
  CREATE TABLE IF NOT EXISTS works(
    id serial PRIMARY KEY,
    title VARCHAR (255) UNIQUE NOT NULL,
    summary text NOT NULL,
    image_url text,
    duration VARCHAR (255),
    number_of_people integer,
    language text,
    role text,
    url text,
    brief_story text
  );
  CREATE INDEX on works(id);
COMMIT;
