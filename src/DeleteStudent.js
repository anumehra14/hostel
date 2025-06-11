import {React,useState} from 'react'


export default function DeleteStudent() {

    const [prn,setPrn]=useState("");

    hanldeChange=(e)=>{
        setPrn=(e.target.value);
    }
    const handleSubmit=async (e)=>{
        const response=await axios.delete(`http://localhost:5000/students/${prn}`);
        e.preventDefault();
        if (!response.ok) { 
            throw new Error('Student not found');
        }
        const student= await response.json();

        document.getElementById('student-details').innerHTML = `
        <p>PRN: ${student.prn}</p>      
        <p>Name: ${student.name}</p>
        <p>Course: ${student.course}</p>    
        <p>Guardian Name: ${student.guardianName}</p>
        `;
    }


            return (
    <div>
      <form onSubmit={hanldeSubmit}>
        <label htmlFor="prn">PRN    </label>
        <input type="text" id="prn" name="prn" required onChange={hanldeChange}/>
        <input type="submit">Delete Student</input> 

      </form>
    </div>
  )
}

