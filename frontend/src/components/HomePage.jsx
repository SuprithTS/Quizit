import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Homepage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const GotoReg = () => {
    navigate('/register');
  };


  return (
    <div className="homepage-container">
      <header className="header">
        <h1>Institutions Innovation Council</h1>
        <p>Siddaganga Institute of Technology, Tumkur</p>
      </header>
      <main className="main-content">
        <h2>Welcome to Recruitment Drive</h2>
        <p>Get ready to showcase your skills and take the first step towards a successful career!</p>
        <button className="btn-start" onClick={GotoReg}>Take Round 1 Test</button>
      </main>
    </div>
  );
}

export default HomePage;