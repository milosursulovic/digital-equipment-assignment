import Equipment from "../models/Equipment.js";

export async function createEquipment(req, res) {
  try {
    const equipment = await Equipment.create(req.body);
    res.json(equipment);
  } catch (err) {
    res.status(400).json({ message: "Failed to create equipment" });
  }
}

export async function getAllEquipment(req, res) {
  const equipment = await Equipment.find();
  res.json(equipment);
}

export async function deleteEquipment(req, res) {
  await Equipment.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
}
