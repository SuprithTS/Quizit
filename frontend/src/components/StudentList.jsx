import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentList.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https:localhost:5000/api/users/students');
        console.log("Fetching the data of students..........");
        
        //Sort students by score in descending order
       const sortedStudents = response.data.sort((a, b) => b.Score - a.Score);
        setStudents(sortedStudents);
        //setStudents(response.data);
      } catch (error) {
        console.error('There was an error fetching the students data!', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div className="student-list">
      <h1>LEADER BOARD</h1>
      <table>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Name</th>
            <th>USN</th>
            <th>Marks</th>
            <th>Branch</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.usn}</td>
              <td>{student.Score}</td>
              <td>{student.branch}</td>
              <td>{student.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
