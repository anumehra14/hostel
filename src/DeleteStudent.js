import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteStudent() {
  const [prn, setPrn] = useState("");
  const [student, setStudent] = useState(null);

  const handleChange = (e) => {
    setPrn(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`http://localhost:5000/students/${prn}`);
      
      if (response.status !== 200) {
        throw new Error('Student not found');
      }

      setStudent(response.data);
    } catch (error) {
      console.error('Error deleting student:', error.message);
      setStudent(null); // Clear student info on error
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prn">PRN</label>
        <input type="text" name="prn" onChange={handleChange} />
        <input type="submit" value="Delete Student" />
      </form>

      {student && (
        <div>
          <p>PRN:    {student.prn}</p>
          <p>Name:   {student.name}</p>
          <p>Course: {student.course}</p>
        </div>
      )}
    </div>
  );
}
