import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/quiz.css";

const Quiz = () => {
  const { quizId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/quiz/${quizId}`)
      .then((response) => setQuestions(response.data))
      .catch((error) => console.error("Error fetching questions", error));
  }, [quizId]);

  const handleAnswer = (answer) => {
    if (answer.correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="quiz-container">
      {quizFinished ? (
        <h2>Your Score: {score}/{questions.length}</h2>
      ) : (
        <>
          <h2>{questions[currentQuestion]?.question}</h2>
          <div>
            {questions[currentQuestion]?.answers.map((answer, index) => (
              <button key={index} onClick={() => handleAnswer(answer)}>
                {answer.text}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
//ignore
export default Quiz;
