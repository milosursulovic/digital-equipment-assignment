import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String },
  department: { type: String },
  contact: { type: String },
});

const Person = mongoose.model("Person", personSchema);
export default Person;
