import pool from "../configs/db.js";

export const userIdinBooks = async () => {
  const query = `
    ALTER TABLE books
    ADD COLUMN IF NOT EXISTS user_id UUID;
  `;

  const query2 = `
    ALTER TABLE books
    ADD CONSTRAINT fk_books_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE;
  `;

  try {
    await pool.query(query);
    console.log("Column user_id ensured");
  } catch (err) {
    console.log("Error adding column:", err.message);
  }

  try {
    await pool.query(query2);
    console.log("Constraint ensured");
  } catch (err) {
    if (err.code === "42710") {
      console.log("Constraint already exists, skip");
    } else {
      console.log("Error adding constraint:", err.message);
    }
  }
};

export const userIdinPapers = async () => {
  const query = `
    ALTER TABLE papers
    ADD COLUMN IF NOT EXISTS user_id UUID;
  `;

  const query2 = `
    ALTER TABLE papers
    ADD CONSTRAINT fk_papers_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE;
  `;

  try {
    await pool.query(query);
    console.log("Column user_id ensured");
  } catch (err) {
    console.log("Error adding column:", err.message);
  }

  try {
    await pool.query(query2);
    console.log("Constraint ensured");
  } catch (err) {
    if (err.code === "42710") {
      console.log("Constraint already exists, skip");
    } else {
      console.log("Error adding constraint:", err.message);
    }
  }
};

export const userIdinBlogs = async () => {
  const query = `
    ALTER TABLE blogs
    ADD COLUMN IF NOT EXISTS user_id UUID;
  `;

  const query2 = `
    ALTER TABLE blogs
    ADD CONSTRAINT fk_blogs_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE;
  `;

  try {
    await pool.query(query);
    console.log("Column user_id ensured");
  } catch (err) {
    console.log("Error adding column:", err.message);
  }

  try {
    await pool.query(query2);
    console.log("Constraint ensured");
  } catch (err) {
    if (err.code === "42710") {
      console.log("Constraint already exists, skip");
    } else {
      console.log("Error adding constraint:", err.message);
    }
  }
};
