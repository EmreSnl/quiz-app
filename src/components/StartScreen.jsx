import React, { useState } from "react";
import "./StartScreen.scss";
import questions from "./questions.json";

const StartScreen = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const question = questions[currentQuestionIndex];

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerClick = (answer) => {
    if (answer === question.correctAnswer) {
      setScore(score + 1);
    } else {
      setWrongAnswers([
        ...wrongAnswers,
        {
          question: question.question,
          yourAnswer: answer,
          correctAnswer: question.correctAnswer,
        },
      ]);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setUserName("");
    setWrongAnswers([]);
  };

  const renderQuestion = () => {
    if (question) {
      return (
        <div className="question-answer-box">
          <h2>{question.question}</h2>
          <div className="answers">
            {question.answers.map((answer, index) => (
              <div
                className="answer-box"
                key={index}
                onClick={() => handleAnswerClick(answer)}
              >
                {answer}
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return <p>Loading questions...</p>;
    }
  };

  return (
    <div className="start-screen">
      <div className="container">
        {!quizStarted && <h1>Welcome to the Quiz App</h1>}

        {!quizStarted ? (
          <>
            <p>Enter your name to begin the quiz:</p>
            <input
              className="name-input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
            />
            <button className="start-btn" onClick={startQuiz}>
              Start Quiz
            </button>
          </>
        ) : quizFinished ? (
          <>
            <h2>Quiz Finished!</h2>
            <p>
              {userName}, you got {score} out of {questions.length} points.
            </p>

            {wrongAnswers.length > 0 && (
              <div className="wrong-answers">
                <h3>Incorrect Answers</h3>
                <ul>
                  {wrongAnswers.map((item, index) => (
                    <li key={index}>
                      <strong>Q:</strong> {item.question}
                      <br />
                      <span className="wrong">Your Answer:</span>{" "}
                      {item.yourAnswer}
                      <br />
                      <span className="correct">Correct Answer:</span>{" "}
                      {item.correctAnswer}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button className="start-btn" onClick={resetQuiz}>
              Go Back to Start
            </button>
          </>
        ) : (
          renderQuestion()
        )}
      </div>
    </div>
  );
};

export default StartScreen;
