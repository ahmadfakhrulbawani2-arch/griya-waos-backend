import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blogsHandler.js";
import authJWT from "../middlewares/authJWT.js";
import authUsername from "../middlewares/authUsername.js";

const router = express.Router();

router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getBlogById);
router.post("/:usernameId/blogs", createBlog);
router.put("/blogs/:id", updateBlog);
router.delete("/blogs/:id", deleteBlog);

export default router;
