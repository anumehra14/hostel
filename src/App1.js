import React ,{useState} from 'react';
import './App.css';
import axios from 'axios';

function App1() {
  
  const[form,setForm]=useState({

 prn:'',
 passsword:'',
 name:'',
 course:'',
 batch:'',
 dateout:'',
 timeout:'',
 datein:'',
 timein:'',
 parentsEmail:''

  });
  const handleChange=(e)=>{

    setForm({
      ...form,
       [e.target.name]:e.target.value
    })
  }

const handleSubmit=async (e)=>
{
e.preventDefault();
try{
  console.log(form);
  
    await axios.post('http://localhost:5000/students',form);
    console.log("done");
    alert('request sent');
}
catch(err){
  console.log(err);
  alert('request failed');
}}

return(

<div style={{maxWidth:500,margin:'0 auto',padding:20}}>
<h2>Student Registration</h2>
<form onSubmit={handleSubmit}>
  <div>
    <label>PRN:</label>
    <input type="text" name="prn" value={form.prn} onChange={handleChange} required />
  </div>
  <div>
    <label>Name:</label>
    <input type="text" name="name" value={form.name} onChange={handleChange} required />
  </div>
  <div>
    <label>Course:</label>
    <input type="text" name="course" value={form.course} onChange={handleChange} required />
  </div>
  <div>
    <label>Batch:</label>
    <input type="text" name="batch" value={form.batch} onChange={handleChange} required />
  </div>
  <div>
    <label>Date Out:</label>
    <input type="date" name="dateout" value={form.dateout} onChange={handleChange} required />
  </div>
  <div>
    <label>Time Out:</label>
    <input type="time" name="timeout" value={form.timeout} onChange={handleChange} required />
  </div>
  <div>
    <label>Date In:</label>
    <input type="date" name="datein" value={form.datein} onChange={handleChange} required />
  </div>
  <div>
    <label>Time In:</label>
    <input type="time" name="timein" value={form.timein} onChange={handleChange} required />
  </div>
  <div>
    <label>Parent's Email:</label>
    <input type="email" name="parentsEmail" value={form.parentsEmail} onChange={handleChange} required />
  </div>

  <button type="submit">Submit</button>
  </form>

</div>

);
}

export default App;
