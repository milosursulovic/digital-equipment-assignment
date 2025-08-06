import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  assignEquipment,
  getAllAssignments,
  generateReversePdf,
  deleteAssignment
} from "../controllers/reverseController.js";

const router = express.Router();

router.post("/", protect, assignEquipment);
router.get("/", protect, getAllAssignments);
router.get("/pdf/:id", protect, generateReversePdf);
router.delete("/:id", protect, deleteAssignment);

export default router;
