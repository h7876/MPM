CREATE TABLE IF NOT EXISTS journal(
    id SERIAL PRIMARY KEY,
    emid VARCHAR(180),
    message VARCHAR(800)
);
insert into journal(emid, message) values('google-oauth2|106004298537907856371', 'This is a sample journal entry');