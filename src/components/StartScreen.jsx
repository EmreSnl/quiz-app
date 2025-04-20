import React, { useState } from "react";
import "./StartScreen.scss";
import questions from "./questions.json";

const StartScreen = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const question = questions[currentQuestionIndex];

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerClick = (answer) => {
    const isCorrect = answer === question.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Kullanıcının cevabını kaydet
    setUserAnswers([
      ...userAnswers,
      {
        question: question.question,
        userAnswer: answer,
        correctAnswer: question.correctAnswer,
        isCorrect,
      },
    ]);

    // Sonraki soruya geç
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
    setUserAnswers([]);
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

  const renderResults = () => (
    <>
      <h2>Quiz Finished!</h2>
      <p>
        {userName}, you got {score} out of {questions.length} right.
      </p>
      <div className="results">
        {userAnswers.map((entry, index) => (
          <div
            key={index}
            className={`result-item ${entry.isCorrect ? "correct" : "wrong"}`}
          >
            <p>
              <strong>Q:</strong> {entry.question}
            </p>
            <p>
              <strong>Your Answer:</strong> {entry.userAnswer}
            </p>
            {!entry.isCorrect && (
              <p>
                <strong>Correct Answer:</strong> {entry.correctAnswer}
              </p>
            )}
          </div>
        ))}
      </div>
      <button className="start-btn" onClick={resetQuiz}>
        Go Back to Start
      </button>
    </>
  );

  return (
    <div className="start-screen">
      <div className="container">
        <h1>Welcome to the Quiz App</h1>

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
          renderResults()
        ) : (
          renderQuestion()
        )}
      </div>
    </div>
  );
};

export default StartScreen;
