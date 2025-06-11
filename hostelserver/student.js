const mongoose = require('mongoose');

// Define the Student Schema
const studentSchema = new mongoose.Schema({
  prn:    { type: String, required: true, unique: true },  // PRN (Unique)
  name:   { type: String, required: true },
  course: { type: String, required: true },
  batch:  { type: String, required: true },
  dateout: { type: Date, required: true },
  timeout: { type: String, required: true },
  datein: { type: Date, required: true },
  timein: { type: String, required: true },
  parentsEmail: { type: String, required: true }
 
});

// Create a model from the schema
module.exports = mongoose.model('Student', studentSchema);
