import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetails";
import Quizz from "./pages/Quizz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/categories/:id" element={<CategoryDetail />} />

        <Route path="/quizz/:id" element={<Quizz />} />
      </Routes>
    </Router>
  );
}

export default App;