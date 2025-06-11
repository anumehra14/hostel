import {React,useState} from 'react'

export default function SearchStudent() {
  
  const [prn,setPrn]=useState("");
  const[student,setStudent]=useState(null);
  const[error,setError]=useState(null);


  const handleChange=(e)=>{
    setPrn(e.target.value);
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setError(null);
    setStudent(null);
    
    try {
      const response = await fetch(`http://localhost:5000/students/${prn}`);
      if (!response.ok) {
        throw new Error('Student not found');
      }
      const student = await response.json();
      setStudent(student);

    } catch (error) {
      setError(error.message);
    }
  };
return (
    <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="prn">PRN:</label>
          <input type="text" id="prn" name="prn" required onChange={handleChange} />
          <button type="submit">Search</button>
      </form>
 
{ error && <p style={{ color:'red'}}> Error:{error}</p> }

{student &&(

<table border="1" cellPadding={8} cellSpacing={0} style={{marginTop:20}}>
  <thead>
    <tr>
      <th>PRN</th>
      <th>Name</th>
      <th>Course</th>
      <th>Batch</th>
      <th>Out Date</th>
      <th>Out Time</th>
      <th>In Date</th>
      <th>In Time</th>
      <th>Parents Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{student.prn}</td>
      <td>{student.name}</td>
      <td>{student.course}</td>
      <td>{student.batch}</td>
      <td>{student.dateout}</td>
      <td>{student.outTime}</td>
      <td>{student.datein}</td>
      <td>{student.timein}</td>
      <td>{student.parentsEmail}</td>
    </tr>
  </tbody>
</table>
)}
  </div>  )  }
    
  