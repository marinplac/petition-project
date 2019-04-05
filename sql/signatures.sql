DROP TABLE IF EXISTS signatures;

CREATE TABLE signatures(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR (100) NOT NULL,
    lastname VARCHAR (100) NOT NULL,
    signature TEXT,
created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
