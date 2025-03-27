import React from 'react';
import "../styles/home.css";

const Home = () => {
  return (
    <>
      <header className="home-header">
        <img
          src="https://www.vr68.fr/wp-content/uploads/2024/03/quiz-dark-1920x783.png"
          alt="Quizz-App Header"
          className="header-image"
          class="img-fluid"
          style={{ height: '', objectFit: 'cover' }}
        />
      </header>

      <div className="home-container mt-5">
        <div className="home-content">
          <h1>Bienvenue sur Quizz-App</h1>
          <section className="concept-section">
            <h2>A propos de nous</h2>
            <p>
              Quizz-App est une plateforme qui vous permet de tester vos connaissances sur divers sujets.
              Que vous soyez amateur de quiz ou que vous souhaitiez simplement apprendre quelque chose de nouveau,
              notre application propose un large choix de catégories. Vous pouvez jouer en tant qu'invité ou créer un compte pour suivre votre progression et rivaliser avec d'autres.
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
