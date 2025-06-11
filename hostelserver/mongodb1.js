const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./student');  // Import the Student model
const app = express();
app.use(cors());
app.use(express.json());  // Middleware to parse JSON request body

// Connect to MongoDB
   mongoose.connect('mongodb://127.0.0.1:27017/etutor1')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

  // Route to get all students
  app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students data", error: err });
  }
});


// PUT route to update student information
app.put('/students/:prn', async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { prn: req.params.prn },
       req.body,
        { new: true }  // Return the updated document
    );

    if (!updatedStudent) {   return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: "Error updating student", error: err });
  }
});


// DELETE route to remove a student by PRN
app.delete('/students/:prn', async (req, res) => 
    {
  try
   {
    const deletedStudent = await Student.findOneAndDelete({ prn: req.params.prn });
    if (!deletedStudent) 
    {
      return res.status(404).json({ message: "Student not found" });
    }
     res.json({ message: "Student deleted successfully", student: deletedStudent });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err });
  }
});

 
 // Route to get student by PRN
app.get('/students/:prn', async (req, res) => {
  try {
    const student = await Student.findOne({ prn: req.params.prn });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: "Error fetching student data", error: err });
  }
});
app.post('/students', async (req, res) => 
{
  try {
    console.log("dattttttta="+ req.body);  
    const student = new Student(req.body);  // Accepts the entire JSON object
    await student.save();
    res.status(201).json(student);
  } 
  catch (err) 
  {   console.log(err);
    res.status(500).json({ message: "Error saving student", error: err });
  }
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
