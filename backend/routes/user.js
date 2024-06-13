const express = require('express');
const router = express.Router();
const Students = require('../models/students');
const Studentmarks = require('../models/studentmarks');

// Register 

router.post('/', (req, res) => {
  console.log("i m perfect");
    res.send("hello I m perfect");

});

router.post('/register', async (req, res) => {
  try {
    const { name, usn, phone, email, year, branch, cgpa } = req.body;
    const newStudent = new Students({ name, usn, phone, email, year, branch, cgpa });
    await newStudent.save();    
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message },"heyyyy");
    
  }
});

router.post('/submit', async (req, res) => {
  try {
    const { name, usn, Score } = req.body;
    const newStudentmrks = new Studentmarks({ name, usn, Score });
    await newStudentmrks.save();
    res.status(201).json(newStudentmrks);
  } catch (error) {
    res.status(500).json({ error: error.message },"heyyyy");
    
  }
});

router.get('/students', async (req, res) => {
  try {
    // Use aggregation to join User and Usermarks collections based on usn
    const students = await Students.find();
    const studentMarks = await Studentmarks.find();

    // Send both collections' data in the response as separate properties
    res.json({
      students: students,
      studentMarks: studentMarks
    });
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;