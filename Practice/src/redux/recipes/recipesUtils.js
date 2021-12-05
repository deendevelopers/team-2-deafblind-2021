import axios from "axios";

const API_KEY = "1fae167ef83a4a56b244effeb1a158ec";


export const addRecipesToSavedRecipes = (savedRecipes, newRecipe) => {
    if(savedRecipes.includes(newRecipe)) return savedRecipes;
    return [...savedRecipes, newRecipe];
}


export const fetchRecipeSearchResultsFromSpoonacular = async (searchQuery) => {
    const recipeSearchQuery = searchQuery.split(" ").join(",");
    console.log(recipeSearchQuery);
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${recipeSearchQuery}`);
    // console.log(response);
    const searchResults = response.data;
    console.log(searchResults);
    return searchResults.results;
}

export const getFullRecipeInfoFromSpoonacular = async (searchResultsRecipes) => {
    let fullRecipeData = [];

    searchResultsRecipes.forEach( async (recipe) => {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`)
        const recipeData = response.data;
        console.log(recipeData);
        fullRecipeData.push(recipeData);
    })

    return fullRecipeData;
}