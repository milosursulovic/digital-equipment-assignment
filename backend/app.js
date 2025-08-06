import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import reverseRoutes from "./routes/reverse.js";
import equipmentRoutes from "./routes/equipment.js";
import personRoutes from "./routes/person.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/reverse", reverseRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/person", personRoutes);

export default app;
