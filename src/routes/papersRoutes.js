import express from "express";
import {
  createPaper,
  deletePaper,
  getAllPapers,
  getPaperById,
  updatePaper,
} from "../controllers/papersHandlers.js";

const router = express.Router();

router.get("/papers", getAllPapers);
router.get("/papers/:id", getPaperById);
router.post("/papers", createPaper);
router.put("/papers/:id", updatePaper);
router.delete("/papers/:id", deletePaper);

export default router;
