import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/quiz.css";

const Quiz = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/questions?quizId=${quizId}`)
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, [quizId]);

  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitScore();
    }
  };

  const submitScore = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.post("http://localhost:8080/api/submit-score", { quizId, score, time: timer }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => navigate("/categories"));
    } else {
      navigate("/categories");
    }
  };

  if (questions.length === 0) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Quiz</h2>
      <p>Time: {timer}s</p>
      <h3>{questions[currentQuestionIndex].text}</h3>
      <div className="button-container">
        {questions[currentQuestionIndex].answers.map((answer) => (
          <button key={answer.id} onClick={() => handleAnswerClick(answer.correct)}>
            {answer.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
