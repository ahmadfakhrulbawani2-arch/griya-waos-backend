import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import pool from "./configs/db.js";
import userRoutes from "./routes/userRoutes.js";
import loginRegisterRoutes from "./routes/loginRegisterRoutes.js";
import booksRoutes from "./routes/booksRoutes.js";
import papersRoutes from "./routes/papersRoutes.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
import createBooksTable from "./data/createBooksTable.js";
import createPapersTable from "./data/createPapersTable.js";
import createBlogsTable from "./data/createBlogsTable.js";

const app = express();
const port = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", loginRegisterRoutes);
app.use("/api/v1", booksRoutes);
app.use("/api/v1", papersRoutes);
app.use("/api/v1", blogsRoutes);
// err handling middleware
app.use(errorHandling);

// creating table
createUserTable();
createBooksTable();
createPapersTable();
createBlogsTable();

// Testing POSTGRES
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is : ${result.rows[0].current_database}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
