import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/quiz.css";

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10); // Temps en secondes
  const [isAnswered, setIsAnswered] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);

  // Récupération des questions
  useEffect(() => {
    const fakeQuestions = [
      {
        id: 1,
        text: "Quel est le langage principal de React ?",
        answers: [
          { id: "a", text: "Java", correct: false },
          { id: "b", text: "JavaScript", correct: true },
          { id: "c", text: "Python", correct: false },
          { id: "d", text: "C#", correct: false }
        ]
      },
      {
        id: 2,
        text: "Quelle société a développé React ?",
        answers: [
          { id: "a", text: "Google", correct: false },
          { id: "b", text: "Microsoft", correct: false },
          { id: "c", text: "Facebook", correct: true },
          { id: "d", text: "Apple", correct: false }
        ]
      }
    ];
    setQuestions(fakeQuestions);
  }, []);

  // Gestion du timer
  useEffect(() => {
    if (!isAnswered && !reviewMode) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            handleNextQuestion();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [isAnswered, reviewMode]);

  const handleAnswerClick = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);

      if (answer.correct) {
        setScore((prevScore) => prevScore + 1);
      } else {
        setIncorrectAnswers([...incorrectAnswers, questions[currentQuestionIndex]]);
      }
    }
  };

  const handleNextQuestion = () => {
    if (reviewMode) {
      if (currentQuestionIndex + 1 < incorrectAnswers.length) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        navigate("/categories");
      }
    } else {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setTimer(10);
      } else {
        if (incorrectAnswers.length > 0) {
          setReviewMode(true);
          setCurrentQuestionIndex(0);
        } else {
          submitScore();
        }
      }
    }
  };

  const submitScore = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(
          "http://localhost:8080/api/submit-score",
          { quizId, score, time: timer },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => navigate("/categories"));
    } else {
      navigate("/");
    }
  };

  if (questions.length === 0) return <p>Chargement des questions...</p>;

  const currentQuestion = reviewMode ? incorrectAnswers[currentQuestionIndex] : questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>{reviewMode ? "Révision des erreurs" : `Question ${currentQuestionIndex + 1} / ${questions.length}`}</h2>

      {/* Barre de progression */}
      <div className="progress-bar">
        <div className="progress" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
      </div>

      {/* Timer */}
      {!reviewMode && <div className="timer">⏳ {timer} s</div>}

      <h3>{currentQuestion.text}</h3>
      <div className="answers-container">
        {currentQuestion.answers.map((answer) => (
          <button
            key={answer.id}
            className={`answer-btn ${selectedAnswer === answer ? (answer.correct ? "correct" : "incorrect") : ""}`}
            onClick={() => handleAnswerClick(answer)}
            disabled={isAnswered}
          >
            {answer.text}
          </button>
        ))}
      </div>

      {isAnswered && (
        <button className="next-btn" onClick={handleNextQuestion}>
          {reviewMode
            ? currentQuestionIndex + 1 === incorrectAnswers.length
              ? "Retour aux catégories"
              : "Suivant"
            : currentQuestionIndex + 1 === questions.length
            ? "Voir le score"
            : "Suivant"}
        </button>
      )}

      {/* Affichage du score en direct */}
      <p className="score">Score actuel : {score} / {questions.length}</p>
    </div>
  );
};

export default Quiz;
