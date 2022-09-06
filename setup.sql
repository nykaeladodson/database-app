-- create pet database
-- use file for schema 

CREATE TABLE dogs (
  id serial UNIQUE PRIMARY KEY,
  name VARCHAR NOT NULL
);

INSERT INTO dogs (name)
  VALUES ('Jaxson'),
         ('Bailey'),
         ('Wilson'),
         ('Cocomo');
