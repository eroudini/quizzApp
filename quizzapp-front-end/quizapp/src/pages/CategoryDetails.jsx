import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar"; 
import axios from "axios";
import "../styles/categoryDetail.css";

const CategoryDetail = () => {
  const { id } = useParams(); 
  const [category, setCategory] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryDetails = async () => {
      try {
        const categoryResponse = await axios.get(`http://localhost:8080/api/categories/${id}`);
        setCategory(categoryResponse.data);

        const quizzesResponse = await axios.get(`http://localhost:8080/api/categories/${id}/quizzes`);
        setQuizzes(quizzesResponse.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des détails de la catégorie", error);
      }
    };

    fetchCategoryDetails();
  }, [id]);

  if (!category) {
    return <div>Chargement...</div>;
  }

  return (

    <>
    <Navbar /> 
    <div className="category-detail-container">
      <h1>{category.name}</h1>
      <p>{category.description}</p>

      <h2>Quiz disponibles</h2>
      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="quiz-card"
            onClick={() => navigate(`/quiz/${quiz.id}`)}
          >
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <p>Nombre de questions : {quiz.questionsCount}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default CategoryDetail;