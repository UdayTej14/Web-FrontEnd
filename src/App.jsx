import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginPage from './components/Loginpage';
import SignUpPage from './components/SignUpPage';
import NavBar from './components/NavBar';
import AboutPage from './components/Aboutpage';
import Italiancuisine from './pages/Italiancuisine';
import Chinesecuisine from './pages/Chinesecuisine';
import Indiancuisine from './pages/Indiancuisine';
import Mexicancuisine from './pages/Mexicancuisine';
import Japanesecuisine from './pages/Japanesecuisine';
import Thaicuisine from './pages/Thaicuisine';
import Recipedetails from './components/Recipedetails';
import Searchresults from './components/Searchresults';
import UserDashboard from './components/UserDashboard';
import './index.css';


const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/cuisine/italian" element={<Italiancuisine />} />
        <Route path="/cuisine/chinese" element={<Chinesecuisine />} />
        <Route path="/cuisine/indian" element={<Indiancuisine />} /> 
        <Route path="/cuisine/mexican" element={<Mexicancuisine />} /> 
        <Route path="/cuisine/japanese" element={<Japanesecuisine />} /> 
        <Route path="/cuisine/thai" element={<Thaicuisine />} />
        <Route path="/recipe/:id" element={<Recipedetails />} />
        <Route path="/search" element={<Searchresults />} />
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;