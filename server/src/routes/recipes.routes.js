import express from 'express';

import {
  createRecipe,
  getAllRecipes,
  getAllSavedRecipes,
  getUserRecipes,
  saveRecipe,
} from '../controllers/recipes.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, createRecipe);
router.get('/', getAllRecipes);
router.put('/', verifyToken, saveRecipe);
router.get('/savedRecipes/ids/:userId', getAllSavedRecipes);
router.get('/savedRecipes/:userId', getUserRecipes);

export default router;
