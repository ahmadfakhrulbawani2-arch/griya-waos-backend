import pool from "../configs/db.js";

export const booksMetadataController = async () => {
  const res = await pool.query("SELECT COUNT(*) FROM books");
  return parseInt(res.rows[0].count);
};

export const getAllBooksController = async (page, limit) => {
  const result = await pool.query(
    "SELECT * FROM books ORDER BY id LIMIT $1 OFFSET $2",
    [limit, (page - 1) * limit],
  );
  return result.rows;
};

export const getBookByIdController = async (id) => {
  const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows[0];
};

export const createBookController = async (payload) => {
  const keys = [];
  const values = [];
  const placeholders = [];

  let idx = 1;

  for (const key in payload) {
    keys.push(key);
    values.push(payload[key]);
    placeholders.push(`$${idx}`);
    idx++;
  }

  const result = await pool.query(
    `
    INSERT INTO books (${keys.join(", ")})
    VALUES (${placeholders.join(", ")})
    RETURNING *
    `,
    values,
  );

  return result.rows[0];
};

export const updateBookController = async (id, payload) => {
  // const keys = [];
  const values = [];
  // const placeholders = [];
  const fields = [];

  let idx = 1;

  for (const key in payload) {
    fields.push(`${key} = $${idx}`);
    // keys.push(key);
    values.push(payload[key]);
    // placeholders.push(`$${idx}`);
    idx++;
  }

  // always update timestamp
  fields.push(`updated_at = $${idx}`);
  values.push(new Date());
  idx++;

  values.push(id);

  const result = await pool.query(
    `
    UPDATE books SET ${fields.join(", ")}
    WHERE id = $${idx}
    RETURNING *
    `,
    values,
  );

  return result.rows[0];
};

export const deleteBookController = async (id) => {
  const result = await pool.query(
    `DELETE FROM books WHERE id = $1 RETURNING *`,
    [id],
  );

  return result.rows[0];
};
