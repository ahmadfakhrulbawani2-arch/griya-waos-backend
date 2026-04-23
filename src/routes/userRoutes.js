import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import authJWT from "../middlewares/authJWT.js";

const router = express.Router();

// dev and superadmin access
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);

// user access
router.put("/user", authJWT, updateUser);
router.delete("/user", authJWT, deleteUser);

export default router;
