CREATE TABLE IF NOT EXISTS employee(
    id SERIAL PRIMARY KEY,
    emid VARCHAR(180),
    emName VARCHAR(180),
    emWGID BIGINT,
    office VARCHAR(180),
    emCellNumber BIGINT,
    emPhoto VARCHAR(180)
    
);
