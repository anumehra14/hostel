const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./student');  // Import the Student model
const app = express();
app.use(cors());
app.use(express.json());  // Middleware to parse JSON request body
const bcrypt = require('bcrypt');

app.post('/login', async (req, res) => 
{
  const { prn, password } = req.body;

  console.log("Login attempt with PRN:", prn, "and password:", password);
  
   try {
    // Find the student by PRN (don't fetch the password directly)
    const student = await Student.findOne({ prn });
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
     // Compare the entered password with the stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, student.password);

    if (isPasswordMatch) {
      console.log("Login successful for student:", prn);
      return res.json({ message: 'Login successful!' });
    } else {
      console.log("Incorrect password");
      return res.status(401).json({ message: 'Incorrect password' });
    }
}
catch(err){
  console.error("error during login");
}}
);

// Connect to MongoDB
   mongoose.connect('mongodb://127.0.0.1:27017/hostel')
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

   const { password,...studentData } = req.body;  // Extract the password and other student data
   
    // Hash the password before saving
    const saltRounds = 10;  // You can adjust the salt rounds
    //10 is optimum for bcrypt
     
     const hashedPassword = await bcrypt.hash(password, saltRounds);
   
     // Create a new student object with the hashed password
     const student = new Student({
      ...studentData,   
         password: hashedPassword,  // Store the hashed password
    });

    console.log("Saving student:", student);
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
