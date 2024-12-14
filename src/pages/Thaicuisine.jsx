// src/components/Thaicuisine.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Thaicuisine = () => {
   const [recipes, setRecipes] = useState([]);

   useEffect(() => {
      // Fetch Thai recipes from backend
      const fetchRecipes = async () => {
         try {
            const response = await axios.get(`http://localhost:5010/api/recipes/Thai`);
            setRecipes(response.data);
         } catch (error) {
            console.error('Error fetching Thai recipes:', error);
         }
      };

      fetchRecipes();
   }, []);

   return (
      <div className="p-4 pt-20">
         <h2 className="text-2xl font-bold mb-4">Thai Cuisine</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
               <div key={recipe._id} className="border rounded-lg p-4 shadow-lg">
                  <Link to={`/recipe/${recipe._id}`}>
                     <img src={recipe.imageURL} alt={recipe.title} className="w-full h-48 object-cover rounded-lg mb-2" />
                     <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                  </Link>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Thaicuisine;