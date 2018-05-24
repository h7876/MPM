INSERT INTO employee (emname, emid, emPhoto)
values ($1, $2, $3)
RETURNING *;