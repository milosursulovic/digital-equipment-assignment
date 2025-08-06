import Assignment from "../models/Assignment.js";
import Equipment from "../models/Equipment.js";
import { createReversePdfBuffer } from "../utils/pdfGenerator.js";

export async function assignEquipment(req, res) {
  const { personId, equipmentIds, note } = req.body;

  console.log(personId, equipmentIds);

  const assignment = await Assignment.create({
    person: personId,
    equipment: equipmentIds,
    note,
  });

  await Equipment.updateMany(
    { _id: { $in: equipmentIds } },
    { $set: { available: false } }
  );

  res.json(assignment);
}

export async function getAllAssignments(req, res) {
  const assignments = await Assignment.find()
    .populate("person")
    .populate("equipment");

  res.json(assignments);
}

export async function generateReversePdf(req, res) {
  const assignment = await Assignment.findById(req.params.id)
    .populate("person")
    .populate("equipment");

  if (!assignment) {
    return res.status(404).json({ message: "Assignment not found" });
  }

  const pdfBuffer = await createReversePdfBuffer(assignment);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=revers_${assignment._id}.pdf`,
  });

  res.send(pdfBuffer);
}

export async function deleteAssignment(req, res) {
  const assignment = await Assignment.findByIdAndDelete(req.params.id);

  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  await Equipment.updateMany(
    { _id: { $in: assignment.equipment } },
    { $set: { available: true } }
  );

  res.json({ message: 'Assignment deleted' });
}
