INSERT INTO journal (emid, message)
values ($1, $2)
RETURNING *;