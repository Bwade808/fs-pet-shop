BEGIN;
DROP TABLE IF EXISTS pets;
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    age integer NOT NULL, 
    kind text NOT NULL,
    pet_name text NOT NULL
);

INSERT INTO pets (age, kind, pet_name) 
VALUES 
(7, 'rainbow', 'Fido'), 
(5, 'snake', 'Buttons'), 
(6, 'titanaboa', 'Deebo'),
(4, 'lizard', 'Lizzy'),
(3, 'parakeet', 'Cornflake');
COMMIT;