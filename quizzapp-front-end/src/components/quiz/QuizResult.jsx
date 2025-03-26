import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QuizResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { quizQuestions = [], totalScores = 0 } = location.state || {};

    const numQuestions = Array.isArray(quizQuestions) ? quizQuestions.length : 0;
    const validatedScores = typeof totalScores === 'number' ? Math.max(0, Math.min(totalScores, numQuestions)) : 0;

    const percentage = numQuestions > 0 
        ? Math.round((validatedScores / numQuestions) * 100)
        : 0;

    const handleRetakeQuiz = () => {
        navigate(-1); // Retour au quiz
    };


    return (
        <section className="container mt-5">
            <h3>Résumé des résultats</h3>
            <hr />
            <div className="alert alert-info">
                <h5>
                    Vous avez répondu à <strong>{validatedScores}</strong> sur <strong>{numQuestions}</strong> questions correctement.
                </h5>
                <p className="mb-0">Score total: <strong>{percentage}%</strong></p>
            </div>

            <button 
                className="btn btn-primary"
                onClick={handleRetakeQuiz}
            >
                ↻ Refaire le quiz
            </button>

           
        </section>
    );
};

export default QuizResult;