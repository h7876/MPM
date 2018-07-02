INSERT INTO journal (emid, message, entrydate)
values ($1, $2, current_timestamp)
RETURNING *;