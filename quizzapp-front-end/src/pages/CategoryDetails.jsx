// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import { useParams } from "react-router-dom";
// import '../styles/CategoryDetails.css';
// import axios from "axios";

// const CategoryDetails = () => {
//     const { id } = useParams(); // Récupère l'ID depuis l'URL
//     const [category, setCategory] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios.get(`http://localhost:8080/api/categories/${id}`)
//             .then((response) => {
//                 setCategory(response.data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Erreur lors de la récupération de la catégorie :", error);
//                 setError("Impossible de charger la catégorie.");
//                 setLoading(false);
//             });
//     }, [id]);

//     if (loading) return <p>Chargement...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//      <>
//         <Navbar />
//         <Navbar />
//             <div className="container">
//                 <h2>Détails de la Catégorie</h2>
//                 <p><strong>ID :</strong> {category.id}</p>
//                 <p><strong>Nom :</strong> {category.name}</p>
//                 <p><strong>Description :</strong> {category.description}</p>
//             </div>
//       </> 
//     );
// };

// export default CategoryDetails;
