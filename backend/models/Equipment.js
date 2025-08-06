import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  serialNumber: { type: String, required: false },
  available: { type: Boolean, default: true },
});

const Equipment = mongoose.model("Equipment", equipmentSchema);
export default Equipment;
