import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createEquipment,
  getAllEquipment,
  deleteEquipment,
} from "../controllers/equipmentController.js";

const router = express.Router();

router.post("/", protect, createEquipment);
router.get("/", protect, getAllEquipment);
router.delete("/:id", protect, deleteEquipment);

export default router;
