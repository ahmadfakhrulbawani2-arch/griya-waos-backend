import pool from "../configs/db.js";

export const userIdinBooks = async () => {
  const query = `
    ALTER TABLE books
    ADD COLUMN user_id UUID;
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
    await pool.query(query2);
    console.log("Add user_id constraint in books");
  } catch (err) {
    console.log("Error adding user_id constraint in books", err);
  }
};

export const userIdinPapers = async () => {
  const query = `
    ALTER TABLE papers
    ADD COLUMN user_id UUID;
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
    await pool.query(query2);
    console.log("Add user_id constraint in papers");
  } catch (err) {
    console.log("Error adding user_id constraint in papers", err);
  }
};

export const userIdinBlogs = async () => {
  const query = `
    ALTER TABLE blogs
    ADD COLUMN user_id UUID;
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
    await pool.query(query2);
    console.log("Add user_id constraint in blogs");
  } catch (err) {
    console.log("Error adding user_id constraint in blogs", err);
  }
};
