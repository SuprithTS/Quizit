import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Register from './components/Register';
import Instructions from './components/Instructions';
import Quiz from './components/Quiz';
import ThankYou from './components/ThankYou';
import StudentList from './components/StudentList';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/students" element={<StudentList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
