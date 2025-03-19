import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import "../styles/categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories", error));
  }, []);

  return (

    <>
    <Navbar /> 
    <div className="categories-container">
      <h2>Choose a Category</h2>
      <div className="category-list">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => navigate(`/quiz/${category.id}`)}
            className="category-card"
          >
            {category.name}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};
//ignore
export default Categories;
