import './App.css';

import React from 'react';

import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import CreateRecipe from './pages/CreateRecipe';
import Home from './pages/Home';
import SavedRecipes from './pages/SavedRecipes';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
