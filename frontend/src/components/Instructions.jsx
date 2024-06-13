import React from "react";
//import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Instructions.css';

const Instructions = () => {
  const navigate = useNavigate();
 // const user = useSelector((state) => state.auth.user);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get('name');
  const usn = queryParams.get('usn');
  console.log("Name:", name);
  console.log("USN:", usn);

  const openFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const startQuiz = () => {
    openFullscreen();
   // window.open(/quiz?name=${name}&usn=${usn}, "_blank", "width=800,height=600");
    navigate(`/quiz?name=${name}&usn=${usn}`);
  };


  // const openQuizWindow = () => {
  //       const quizWindow = window.open(/quiz?name=${name}&usn=${usn}, "_blank", "width=800,height=600");
  //       quizWindow.addEventListener('load', () => {
  //         if (quizWindow) {
  //           quizWindow.document.documentElement.requestFullscreen();
  //         }
  //       });
  //     };

  return (
      <div className="container">
        <h2>Online Test Instructions</h2>
    <p>Here are the instructions for the test:</p>
    <div class="instructions">
        <ul>
            <li><strong>Duration:</strong> 60 minutes</li>
            <li><strong>Number of Questions:</strong> 45</li>
            <li>30 Easy to Medium level</li>
            <li>15 Medium to Hard level</li>
            <li><strong>Full Screen Mode:</strong></li>
            <li>The test must be taken in full screen mode.</li>
            <li>If you exit full screen mode twice, your action will be noted and the test will be automatically submitted.</li>
        </ul>
    </div>
        <button onClick={startQuiz}>Start Test</button>
      </div>
  );
};

export default Instructions;