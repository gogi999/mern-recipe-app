import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    ingredients: [{
        type: String,
        required: true
    }],  
    instructions: {
        type: String,
        required: true
    },
    imageUrl : {
        type: String,
        required: true
    },
    cookingTime: {
        type: String,
        required: true,
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps:true
});

export default mongoose.model('Recipe', recipeSchema);
