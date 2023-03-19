import React, { useState } from 'react';

import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { useGetUserID } from '../hooks/useGetUserID';

const CreateRecipe = () => {
    const userId = useGetUserID();
    const [recipe, setRecipe] = useState({
        name: '',
        ingredients: [],
        instructions: '',
        imageUrl: '',
        cookingTime: '',
        userOwner: userId,
    });
    const navigate = useNavigate();
    const [cookies] = useCookies(['access_token']);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value });
    }

    const handleAddIngredient = () => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
    }

    const handleIngredientChange = (e, idx) => {
        const { value } = e.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.post(
                'http://localhost:5000/recipes', 
                recipe,
                { headers: { authorization: cookies.access_token } }
            );
            alert('Recipe successfully created!');
            setRecipe({
                name: '',
                ingredients: [],
                instructions: '',
                imageUrl: '',
                cookingTime: '',
                userOwner: userId,
            });
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="create-recipe">
            <h2>Create Recipe</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={recipe.name}
                    onChange={handleChange}
                />
                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient, i) => (
                    <input
                        key={i}
                        type="text"
                        name="ingredients"
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(e, i)}
                    />
                ))}
                <button type="button" onClick={handleAddIngredient}>
                    Add Ingredient
                </button>
                <label htmlFor="instructions">Instructions</label>
                <textarea
                    id="instructions"
                    name="instructions"
                    value={recipe.instructions}
                    onChange={handleChange}
                ></textarea>
                <label htmlFor="imageUrl">Image URL</label>
                <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={recipe.imageUrl}
                    onChange={handleChange}
                />
                <label htmlFor="cookingTime">Cooking Time</label>
                <input
                    type="text"
                    id="cookingTime"
                    name="cookingTime"
                    value={recipe.cookingTime}
                    onChange={handleChange}
                />
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    );
}

export default CreateRecipe;
