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
router.post("/:username/blogs", authJWT, authUsername, createBlog);
router.put("/:username/blogs/:id", authJWT, authUsername, updateBlog);
router.delete("/:username/blogs/:id", authJWT, authUsername, deleteBlog);

export default router;
