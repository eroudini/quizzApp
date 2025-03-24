import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/quizzes/${categoryId}`);
  };

  return (
    <div className="container">
      <h2>Select a Category</h2>
      <div className="button-container">
        {categories.map((category) => (
          <button key={category.id} onClick={() => handleCategoryClick(category.id)}>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
