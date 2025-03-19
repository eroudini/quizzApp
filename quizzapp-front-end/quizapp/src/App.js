import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Categories from "./Categories";
import CategoryDetail from "./CategoryDetail";
import Quiz from "./quizz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/categories/:id" element={<CategoryDetail />} />

        <Route path="/quizz/:id" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;