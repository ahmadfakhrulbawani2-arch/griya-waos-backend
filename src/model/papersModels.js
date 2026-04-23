import pool from "../configs/db.js";

export const papersMetadataController = async () => {
  const res = await pool.query("SELECT COUNT(*) FROM papers");
  return parseInt(res.rows[0].count);
};

export const getAllPapersController = async (page, limit) => {
  const result = await pool.query(
    `
    SELECT * FROM papers ORDER BY id LIMIT $1 OFFSET $2
    `,
    [limit, (page - 1) * limit],
  );
  return result.rows;
};

export const getPaperByIdController = async (id) => {
  const result = await pool.query(`SELECT * FROM papers WHERE id = $1`, [id]);

  return result.rows[0];
};

export const createPaperController = async (payload) => {
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
    INSERT INTO papers (${keys.join(", ")})
    VALUES (${placeholders.join(", ")})
    RETURNING *
    `,
    values,
  );

  return result.rows[0];
};

export const updatePaperController = async (id, payload, userId) => {
  const values = [];
  const fields = [];

  let idx = 1;
  for (const key in payload) {
    fields.push(`${key} = $${idx}`);
    values.push(payload[key]);
    idx++;
  }

  fields.push(`updated_at = $${idx}`);
  values.push(new Date());
  idx++;

  values.push(id);
  idx++;
  values.push(userId);

  const result = await pool.query(
    `
    UPDATE papers SET ${fields.join(", ")}
    WHERE id = $${idx - 1} AND user_id = $${idx}
    RETURNING *
    `,
    values,
  );

  if (result.rows.length === 0) {
    const error = new Error("Data not found or unauthorized");
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};

export const deletePaperController = async (id, userId) => {
  const result = await pool.query(
    `DELETE FROM papers WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, userId],
  );

  if (result.rows.length === 0) {
    const error = new Error("Data not found or unauthorized");
    error.statusCode = 404;
    throw error;
  }

  return result.rows[0];
};
