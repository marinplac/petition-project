DROP TABLE IF EXISTS signatures;

CREATE TABLE signatures(
    id SERIAL PRIMARY KEY,
    signature TEXT,
created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
user_id INTEGER NOT NULL
    );
