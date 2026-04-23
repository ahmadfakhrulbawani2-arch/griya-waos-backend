import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBooksById,
  updateBook,
} from "../controllers/booksHandler.js";
import authJWT from "../middlewares/authJWT.js";
import authUsername from "../middlewares/authUsername.js";

const router = express.Router();

router.get("/books", getAllBooks);
router.get("/books/:id", getBooksById);
router.post("/:username/books", authJWT, authUsername, createBook);
router.put("/:username/books/:id", authJWT, authUsername, updateBook);
router.delete("/:username/books/:id", authJWT, authUsername, deleteBook);

export default router;
