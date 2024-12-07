// src/components/Searchresults.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Searchresults = () => {
   const [results, setResults] = useState([]);
   const query = new URLSearchParams(useLocation().search).get('query');

   useEffect(() => {
      const fetchResults = async () => {
         try {
            const response = await axios.get(`http://localhost:5010/api/recipes/recipe/search`, {
               params: { query }
            });

            console.log(response.data)
            setResults(response.data);
         } catch (error) {
            console.error('Error fetching search results:', error);
         }
      };

      if (query) {
         fetchResults();
      }
   }, [query]);

   return (
      <div className="p-4">
         <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((recipe) => (
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

export default Searchresults;