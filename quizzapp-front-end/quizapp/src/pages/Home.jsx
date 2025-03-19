import Navbar from "./Navbar"; // Importez le composant Navbar
import Navbar from "./Navbar"; // Importez le composant Navbar
import "../styles/home.css";

const Home = () => {
  return (
    <>
      <Navbar /> {/* La Navbar est maintenant en dehors du home-container */}
      <div className="home-container">
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
    <>
      <Navbar /> {/* La Navbar est maintenant en dehors du home-container */}
      <div className="home-container">
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
    </>
  );
};


export default Home;
