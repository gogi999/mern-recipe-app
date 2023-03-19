import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import { useGetUserID } from '../hooks/useGetUserID';

const SavedRecipes = () => {
    const userId = useGetUserID();
    const [savedRecipes, setSavedRecipes] = useState([]);
  
    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/recipes/savedRecipes/${userId}`
                );
                setSavedRecipes(data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
        }

        fetchSavedRecipes();
    }, []);
  
    return (
        <div>
            <h1 className="recipe-title">Saved Recipes</h1>
            <ul>
                {savedRecipes.map((recipe) => (
                    <li key={recipe._id}  className="recipe-container">
                        <div>
                            <h2>{recipe.name}</h2>
                        </div>
                        <div>
                        <h4>Instructions</h4>
                            <p>{recipe.instructions}</p>
                        </div>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>Cooking Time: {recipe.cookingTime}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
  
export default SavedRecipes;
  