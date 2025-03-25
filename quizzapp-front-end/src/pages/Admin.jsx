import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
	return (
		<section className="container mt-7">
			<h2 className="mt-5">Bievenue sur la page Admin</h2>
			<hr />
			<nav className="nav flex-column">
				<Link to={"/create-quiz"} className="nav-link">
					Créer un nouveau quiz
				</Link>
				<Link to={"/all-quizzes"} className="nav-link">
					Gérer un quiz
				</Link>
			</nav>
		</section>
	)
}

export default Admin