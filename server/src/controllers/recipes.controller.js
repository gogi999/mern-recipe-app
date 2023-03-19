import Recipe from '../models/recipe.model.js';
import User from '../models/user.model.js';

export const createRecipe = async (req, res, next) => {
    const recipe = new Recipe(req.body);

    try {
        const response = await recipe.save();

        res.status(201).json(response);
    } catch (err) {
        next(err);
    }
}

export const getAllRecipes = async (req, res, next) => {
    try {
        const recipes = await Recipe.find({});

        res.status(200).json(recipes);
    } catch (err) {
        next(err);
    }
}

export const saveRecipe = async (req, res, next) => {
    try {
        const recipe = await Recipe.findById(req.body.recipeId);
        const user = await User.findById(req.body.userId);

        user.savedRecipes.push(recipe);
        await user.save();

        res.status(200).json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        next(err);
    }
}

export const getAllSavedRecipes = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);

        res.status(200).json({ savedRecipes: user?.savedRecipes });
    } catch (err) {
        next(err);
    }
}

export const getUserRecipes = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        const savedRecipes = await Recipe.find({
            _id: { $in: user.savedRecipes },
        });

        res.status(200).json({ savedRecipes });
    } catch (err) {
        next(err);
    }
}
