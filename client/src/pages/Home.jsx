import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import { useCookies } from 'react-cookie';

import { useGetUserID } from '../hooks/useGetUserID';

const Home = () => {
    const userId = useGetUserID();
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies] = useCookies(['access_token']);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/recipes');
                setRecipes(data);
            } catch (err) {
                console.error(err);
            }
        }

        const fetchSavedRecipes = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/recipes/savedRecipes/ids/${userId}`);
                setSavedRecipes(data.savedRecipes);
            } catch (err) {
                console.error(err);
            }
        }

        fetchRecipes();

        if (cookies.access_token) fetchSavedRecipes();
    }, []);

    const saveRecipe = async (recipeId) => {
        try {
            const { data } = await axios.put(
                'http://localhost:5000/recipes', 
                { recipeId, userId },
                { headers: { authorization: cookies.access_token } }
            );
            setSavedRecipes(data.savedRecipes);
        } catch (err) {
            console.error(err);
        }
    }

    const isRecipeSaved = (id) => savedRecipes.includes(id); 

    return (
        <div>
            <h1 className="recipe-title">Recipes</h1>
            <ul>
                {recipes.map((recipe) => (
                    <li key={recipe._id}  className="recipe-container">
                        <div>
                            <h2>{recipe.name}</h2>
                            <button 
                                onClick={() => saveRecipe(recipe._id)} 
                                className="save-btn"
                                disabled={isRecipeSaved(recipe._id)}    
                            >
                                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                            </button>
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

export default Home;
