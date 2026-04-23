import pool from "../configs/db.js";

export const userMetadataController = async () => {
  const res = await pool.query("SELECT COUNT(*) FROM users");
  return parseInt(res.rows[0].count);
};

export const getAllUsersService = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};
export const getUserByIdService = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const getUserByUsernameService = async (username) => {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return result.rows[0];
};

export const getUserByEmailService = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

export const createUserService = async (username, email, password) => {
  const result = await pool.query(
    `
    INSERT INTO users (username, email, password) VALUES ($1, $2, $3)
    RETURNING username, email
    `,
    [username, email, password],
  );
  return result.rows[0];
};
export const updateUserService = async (id, username, email, password) => {
  const result = await pool.query(
    `
    UPDATE users SET username = $1, email = $2, updated_at = $4, password = $5  
    WHERE id=$3
    RETURNING id, username, email
  `,
    [username, email, id, new Date(), password],
  );
  return result.rows[0];
};
export const deleteUserService = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING id, username, email
  `,
    [id],
  );
  return result.rows[0];
};
