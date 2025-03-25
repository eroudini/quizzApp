import React from "react"
import { useLocation} from "react-router-dom"

 const QuizResult = () => {
		const location = useLocation()
		const { quizQuestions, totalScores } = location.state
		const numQuestions = quizQuestions.length
		const percentage = Math.round((totalScores / numQuestions) * 100)

		const handleRetakeQuiz = () => {
			alert("Oops! this functionality was not implemented!!!")
		}

		return (
			<section className="container mt-5">
				<h3>Résumé des résultats de votre quiz</h3>
				<hr />
				<h5 className="text-info">
				Vous avez répondu {totalScores} sur {numQuestions} questions correct.
				</h5>
				<p>Score Total de {percentage}%.</p>

				<button className="btn btn-primary btn-sm" onClick={handleRetakeQuiz}>
				Refaire ce quiz
				</button>
			</section>
		)
 }

 export default QuizResult