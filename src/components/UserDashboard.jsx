import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login status
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    description: '',
    ingredients: [{ name: '', quantity: '', measurementUnit: '' }],
    cookingTime: '',
    prepTime: '',
    servings: '',
    imageURL: '',
    categories: '', // Handle category as a single string in the frontend
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/users/me');
        setUser(response.data);
        setRecipes(response.data.recipes || []);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setIsLoggedIn(false); // User is not logged in
          navigate('/login'); // Redirect to login page
        } else {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...newRecipe.ingredients];
    updatedIngredients[index][field] = value;
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: updatedIngredients,
    }));
  };



  const addIngredientField = () => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '', measurementUnit: '' }],
    }));
  };

  const handleSubmit = async () => {
    try {
      const recipeToSave = {
        ...newRecipe,
        categories: [newRecipe.categories], // Convert single string to array before sending
      };

      const response = await axios.post('http://localhost:5010/api/recipes/add', recipeToSave);
      alert('Recipe added successfully');
      setRecipes((prev) => [...prev, response.data.recipe]);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  if (!isLoggedIn) {
    return null; // Prevent rendering the dashboard if not logged in
  }

  return (
    <div className="dashboard-container p-6 pt-20">
      <div className="profile-section text-center mb-6">
        <img
          src={user?.profilePicture || '/default-profile.png'}
          alt="Profile"
          className="w-20 h-20 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
        <p className="text-gray-500">{user?.email || ''}</p>
      </div>

      <div className="recipes-section">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add New Recipe
        </button>

        <div className="recipes-list mt-6">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card mb-4 border p-4">
              <h3 className="text-xl font-bold">{recipe.title}</h3>
              <p>{recipe.description}</p>
              <button
                onClick={() => navigate(`/recipe/${recipe._id}`)}
                className="text-blue-500 hover:underline"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal fixed inset-0 bg-gray-900 bg-opacity-90 flex justify-center items-center overflow-auto pt-20">
          <div className="modal-content bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
            >
              X
            </button>

            <h2 className="text-xl font-bold mb-4 text-white">Add New Recipe</h2>
            <div>
              <label className="text-gray-300">Title</label>
              <input
                type="text"
                name="title"
                value={newRecipe.title}
                onChange={handleChange}
                className="w-full mb-4 p-2 border bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="text-gray-300">Description</label>
              <textarea
                name="description"
                value={newRecipe.description}
                onChange={handleChange}
                className="w-full mb-4 p-2 border bg-gray-700 text-white"
              ></textarea>
            </div>

            <div>
              <h3 className="text-gray-300">Ingredients</h3>
              <div className="overflow-y-auto max-h-40 border p-2 bg-gray-700 rounded">
                {newRecipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      className="w-full mb-2 p-2 border bg-gray-600 text-white"
                    />
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      className="w-full mb-2 p-2 border bg-gray-600 text-white"
                    />
                    <input
                      type="text"
                      placeholder="Measurement Unit"
                      value={ingredient.measurementUnit}
                      onChange={(e) => handleIngredientChange(index, 'measurementUnit', e.target.value)}
                      className="w-full mb-2 p-2 border bg-gray-600 text-white"
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={addIngredientField}
                className="bg-gray-600 text-gray-300 px-2 py-1 rounded hover:bg-gray-500 mt-2"
              >
                + Add Ingredient
              </button>
            </div>

            <div>
              <label className="text-gray-300">Category</label>
              <select
                name="categories"
                value={newRecipe.categories}
                onChange={handleChange}
                className="w-full mb-4 p-2 border bg-gray-700 text-white"
              >
                <option value="">Select a Category</option>
                <option value="Indian">Indian</option>
                <option value="Chinese">Chinese</option>
                <option value="Thai">Thai</option>
                <option value="Japanese">Japanese</option>
                <option value="Mexican">Mexican</option>
                <option value="Italian">Italian</option>
              </select>
            </div>

            <div>
              <label className="text-gray-300">Image URL</label>
              <input
                type="text"
                name="imageURL"
                value={newRecipe.imageURL}
                onChange={handleChange}
                className="w-full mb-4 p-2 border bg-gray-700 text-white"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
            >
              Add Recipe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
