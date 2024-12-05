const Recipe = require('../models/Recipe');

// show all recipes, pulls data from our database
exports.getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recipes', error });
    }
};

// retrieve by ID
exports.getRecipeByID = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({message: "Recipe cannot be found"});   
        }
        res.json(recipe); 
    } catch (error) {
        res.status(500).json({message: "Error fetching recipe", error});
    }
};

// updates database with new recipe
exports.addRecipe = async (req, res) => {
    try {
        const newRecipe = new Recipe({
            title: req.body.title,
            cuisineType: req.body.cuisineType,
            ingredients: req.body.ingredients,
            totalPrepTime: req.body.totalPrepTime,
            totalCookTime: req.body.totalCookTime,
            instructions: req.body.instructions,
        });
        await newRecipe.save();

        res.status(201).json({message: "Recipe added", recipe: newRecipe});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error adding recipe", error});
    }
};

exports.homepage = async(req, res) => {
    res.render('index', {title: 'Recipe Hub - Home'});
}