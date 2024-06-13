
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { questions } from "./data";
import axiosInstance from '../app/Axios';
import "./Quiz.css"; 
var count = 0;

const Quiz = () => {
    const [isFullscreen, setIsFullscreen] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [timer, setTimer] = useState(100); // 10 minutes timer
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user); // Get the user from state
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('name');
    const usn = queryParams.get('usn');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitted, setSubmitted] = useState(false); // New state for tracking submission

    const quizContainerRef = useRef(null); // Ref for the quiz container

    useEffect(() => {
        const handleFullscreenChange = () => {
            if (
                !document.fullscreenElement &&
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement &&
                !document.msFullscreenElement
            ) {
                setIsFullscreen(false);
                if (count === 1) {
                    handleSubmit();
                } else {
                    count++;
                    setShowModal(true);
                }
            } else {
                setIsFullscreen(true);
            }
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        document.addEventListener("mozfullscreenchange", handleFullscreenChange);
        document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
        document.addEventListener("msfullscreenchange", handleFullscreenChange);

        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 0) {
                    clearInterval(countdown);
                    handleSubmit();
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
            document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
            document.removeEventListener("msfullscreenchange", handleFullscreenChange);
            clearInterval(countdown);
        };
    }, []);

    const handleOptionChange = (questionId, option) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [questionId]: option,
        }));
    };

    const handlePrev = () => {
        setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNext = () => {
        setCurrentQuestionIndex((prevIndex) =>
            Math.min(prevIndex + 1, questions.length - 1)
        );
    };

    const handleSubmit = async () => {
        if (loading || submitted) return; // Prevent multiple submissions
        setLoading(true);
        let score = 0;
        questions.forEach((question) => {
            if (selectedOptions[question.id] === question.correctAnswer) {
                score += 1;
            }
        });
        console.log("Selected Options:", selectedOptions);
        navigate('/thankyou');
        console.log("Total Score:", score);
        try {
            const data = {
                name: name,
                usn: usn,
                Score: score
            };
            await axiosInstance.post('/api/users/submit', data);
            setLoading(false);
            setSubmitted(true);
            navigate('/thankyou');
        } catch (error) {
            setLoading(false);
            setError(error.message);
            console.error(error);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const openFullscreen = () => {
        const elem = quizContainerRef.current; // Use the ref to get the quiz container element
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch((err) => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen().catch((err) => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen().catch((err) => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen().catch((err) => {
                console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        }
    };

    useEffect(() => {
        openFullscreen(); // Enter fullscreen on component mount
    }, []);

    const handleModalConfirm = () => {
        setShowModal(false);
        openFullscreen(); // Re-enter fullscreen mode after dismissing modal
    };

    return (
        <div className="quiz-main-container" ref={quizContainerRef}> {/* Attach the ref to the main container */}
            <div className="quiz-container">
                <div className="header">
                    <div className="timer">Time Left: {formatTime(timer)}</div>
                    <button className="submit-test-button" onClick={handleSubmit}>Submit Test</button>
                </div>
                <div className="quiz-content">
                    <div className="question-area">
                        <div className="questionsss">
                            <h2><span>{currentQuestionIndex + 1}. </span>{questions[currentQuestionIndex].question}</h2>
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        id={`option-${index}`}
                                        name={`question-${questions[currentQuestionIndex].id}`}
                                        value={option}
                                        checked={
                                            selectedOptions[questions[currentQuestionIndex].id] === option
                                        }
                                        onChange={() =>
                                            handleOptionChange(questions[currentQuestionIndex].id, option)
                                        }
                                    />
                                    <label htmlFor={`option-${index}`}>{option}</label>
                                </div>
                            ))}
                        </div>
                        <div className="navigation-buttons">
                            <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentQuestionIndex === questions.length - 1}
                            >
                                Save and Next
                            </button>
                        </div>
                    </div>
                    
               
                <div className="question-nav">
                        {questions.map((q, index) => (
                            <button
                                key={q.id}
                                onClick={() => setCurrentQuestionIndex(index)}
                                style={{
                                    backgroundColor: selectedOptions[q.id] ? "green" : "white",
                                    border: selectedOptions[q.id]
                                        ? "2px solid black"
                                        : "1px solid black",
                                    color: selectedOptions[q.id] ? "white" : "black",
                                }}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    </div>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>You have exited fullscreen mode {count} times. Please return to fullscreen mode to continue the quiz.</p>
                        <button onClick={handleModalConfirm}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Quiz;
