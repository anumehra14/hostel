import React from 'react'


import {BrowserRouter as Router,Routes,Link,Route}from 'react-router-dom';
import StudentForm from './StudentForm'
import SearchStudent from './SearchStudent'
import DeleteStudent from './DeleteStudent'


//install npm install react-router-dom
export default function App() {
  return (
    <Router>
      <div>
      <h1>Hostel Management System</h1>
      <nav>
        <ul>
           <li> <Link to="/register">Register Student</Link></li>
            <li><Link to="/search">  Search Student</Link></li>
             <li><Link to="/delete">  Delete Student</Link></li>
            
           
        </ul>
        </nav>

<Routes>
  <Route path="/register" element={<StudentForm/>}  /> 
  <Route path="/search"   element={<SearchStudent/>}/>
  <Route path="/delete"   element={<DeleteStudent/>}/>
</Routes>
      </div>
    </Router>
  )
}
