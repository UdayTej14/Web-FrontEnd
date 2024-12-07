// src/components/RecipeDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ rating }) => {
  // Define the color logic based on the rating value
  const getColor = (rating) => {
    if (rating >= 4) return "green"; // High rating (4 and above)
    if (rating >= 2) return "orange"; // Medium rating (2 - 3.9)
    return "red"; // Low rating (below 2)
  };

  // Calculate full, half, and empty stars
  const fullStars = Math.floor(rating); // Full stars
  const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Half star
  const emptyStars = 5 - fullStars - halfStar; // Empty stars

  return (
    <div className='flex'>
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} color={getColor(rating)} />
      ))}

      {/* Render half star if applicable */}
      {halfStar === 1 && (
        <FaStarHalfAlt key="half" color={getColor(rating)} />
      )}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} color={getColor(rating)} />
      ))}
    </div>
  );
};
 
const RecipeDetails = () => {
   const { id } = useParams();
   const [recipe, setRecipe] = useState(null);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchRecipeDetails = async () => {
         try {
            const response = await axios.get(`http://localhost:5010/api/recipes/recipe/${id}`);
            setRecipe(response.data);
            setError(null);
         } catch (err) {
            console.error('Error fetching recipe details:', err);
            setError('Error fetching recipe details. Please try again later.');
         }
      };

      fetchRecipeDetails();
   }, [id]);

   if (error) return <p className="text-red-500">{error}</p>;
   if (!recipe) return <p>Loading...</p>;

   return (
      <div className="p-8 flex flex-col items-center">
         <h2 className="text-3xl font-bold mb-8 mt-16 text-center">{recipe.title}</h2>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
            {/* Details Section */}
            <div className="flex flex-col space-y-4">
               <p className="text-lg mb-4 text-white">{recipe.description}</p>

               {/* Additional Details */}
               <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
               <p><strong>Preparation Time:</strong> {recipe.prepTime} minutes</p>
               <p><strong>Servings:</strong> {recipe.servings}</p>
               <p><strong>Category:</strong> {recipe.categories}</p>

               <div>
                  <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
                  <ul className="list-disc pl-6 mb-4">
                     {recipe.ingredients.map((ingredient, index) => (
                        <li key={index} >{`${ingredient.name}: ${ingredient.quantity} ${ingredient.measurementUnit}`}</li>
                     ))}
                  </ul>
               </div>
               
               <div>
                  <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
                  <ol className="list-decimal pl-6">
                     {recipe.instructions.map((step, index) => (
                        <li key={index} >{step}</li>
                     ))}
                  </ol>
               </div>

               {/* Comments Section */}
               {recipe.comments && recipe.comments.length > 0 && (
                  <div>
                     <h3 className="text-xl font-semibold mb-2">Comments:</h3>
                     <ul className="list-disc pl-6 mb-4">
                        {recipe.comments.map((comment, index) => (
                           <li key={index} >
                              <p>{comment.content}</p> {/* Render only the content of each comment */}
                              <small>Posted on: {new Date(comment.datePosted).toLocaleDateString()}</small>
                           </li>
                        ))}
                     </ul>
                  </div>
               )}

               {/* Ratings Section */}
               {recipe.ratings && recipe.ratings.length > 0 && (
                  <div>
                     <h3 className="text-xl font-semibold mb-2">Ratings:</h3>
                     <p>Average Rating: {(recipe.ratings.reduce((acc, rating) => acc + rating.score, 0) / recipe.ratings.length).toFixed(1)}</p>
                     <Rating rating={(recipe.ratings.reduce((acc, rating) => acc + rating.score, 0) / recipe.ratings.length).toFixed(1)} />
                  </div>
               )}
            </div>

            {/* Image Section */}
            <div className="flex items-center justify-center">
               <img src={recipe.imageURL} alt={recipe.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
            </div>
         </div>
      </div>
   );
};

export default RecipeDetails;