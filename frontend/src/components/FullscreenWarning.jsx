
// FullscreenWarning.js
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { openFullscreen } from "./fullscreen";
//import "./FullscreenWarning.css"; // Import CSS for the warning page

const FullscreenWarning = () => {
  const navigate = useNavigate();
  const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    const usn = queryParams.get('usn');
    var score = queryParams.get('score');

  const handleReturnToQuiz = () => {
    
    openFullscreen();
    navigate(`/quiz?name=${name}&usn=${usn}&marks=${score}`);
  };

  return (
    <div className="fullscreen-warning-container">
      <h2>You have exited fullscreen mode</h2>
      <p>Please return to fullscreen mode to continue the quiz.</p>
      <button onClick={handleReturnToQuiz}>Return to Quiz</button>
    </div>
  );
};

export default FullscreenWarning;