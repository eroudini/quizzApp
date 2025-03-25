import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/categories.css";

const Quizzes = () => {
  const { categoryId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/api/quizzes?categoryId=${categoryId}`)
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, [categoryId]);

  const handleQuizClick = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="container">
      <h2>Select a Quiz</h2>
      <div className="button-container">
        {quizzes.map((quiz) => (
          <button key={quiz.id} onClick={() => handleQuizClick(quiz.id)}>
            {quiz.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
