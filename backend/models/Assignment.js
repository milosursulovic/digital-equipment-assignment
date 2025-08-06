import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  person: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Equipment" }],
  note: { type: String },
  dateAssigned: { type: Date, default: Date.now },
});

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;
