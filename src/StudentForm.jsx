import React, { useState } from 'react';
import axios from 'axios';
import './StudentForm.css';

const StudentForm = () => 
  {
    const [formData, setFormData] = useState({
    prn: '',
    name: '',
    password: '',
    course: '',
    batch: '',
    dateout: '',
    timeout: '',
    datein: '',
    timein: '',
    parentsEmail: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/students', formData);
      alert('Student details submitted successfully!');
    } catch (error) {
      alert('Error submitting form: ' + error.response?.data?.error || error.message);
    }
  };

  return (
   
     <form onSubmit={handleSubmit}>
      {Object.entries(formData).map(([key, value]) => (
        <div key={key}>
          <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
          <input
            type={key.includes('date') ? 'date' : key.includes('time') ? 'time' : 'text'}
            name={key}
            value={value}
            onChange={handleChange}
            required
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;
