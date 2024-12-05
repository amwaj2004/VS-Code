const express = require('express');
const mongoose = require('mongoose');
const recipeController = require('./controllers/recipeController'); // Import recipe controller
const path = require('path'); 

//THIS REQUIRES A .env FILE WITH MONGODB_URI and PORT

const dotenv = require('dotenv');
dotenv.config();
const Recipe = require('./models/Recipe'); // Import recipe schema
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for POST requests
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB', error));

app.use(express.static(path.join(__dirname, 'public'))); 

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello from Express and Mongoose!');
});

// More routes
app.get('/homepage', recipeController.homepage);
app.get('/recipes', recipeController.getAllRecipes);
app.get('/recipes/:id', recipeController.getRecipeByID);
app.post('/recipes', recipeController.addRecipe);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});