import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
	return (
		<section className="container">
			<h2 className="mt-5">Bienvenue sur la page Admin</h2>
			<hr />
			<nav className="nav flex-column">
				<Link to={"/create-quiz"} className="nav-link">
					Crée un nouveau quiz
				</Link>
				<Link to={"/all-quizzes"} className="nav-link">
					Gérér un quiz existant
				</Link>
			</nav>
		</section>
	)
}

export default Admin
