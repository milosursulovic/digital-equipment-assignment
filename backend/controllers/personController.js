import Person from "../models/Person.js";

export async function getAllPersons(req, res) {
  const people = await Person.find();
  res.json(people);
}

export async function createPerson(req, res) {
  const person = await Person.create(req.body);
  res.status(201).json(person);
}

export async function deletePerson(req, res) {
  await Person.findByIdAndDelete(req.params.id);
  res.json({ message: "Obrisano" });
}
