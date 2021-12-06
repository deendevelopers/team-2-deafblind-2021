import axios from "axios";

// const API_KEY = "1fae167ef83a4a56b244effeb1a158ec";
// const API_KEY = "bba9229204a74ae79374bfc68ef3117f";

const API_KEY = "6f9a324efd194a8ba56f0dc75b7b1f2b";
// const API_KEY = "a11e74b4f63c43acbb84d48de0e61221";
// const API_KEY = "f5d5adab98d54ebda09f396de1180a1a";

export const addRecipesToSavedRecipes = (savedRecipes, newRecipe) => {
  if (savedRecipes.includes(newRecipe)) return savedRecipes;
  return [...savedRecipes, newRecipe];
};

export const fetchRecipeSearchResultsFromSpoonacular = async ({
  searchQuery,
  dietTerm,
  allergiesTerm,
  mealTypesTerm,
}) => {
  const recipeSearchQuery = searchQuery.split(" ").join(",");
  console.log(recipeSearchQuery);
  let endpoint = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${recipeSearchQuery}`;

  if (dietTerm) endpoint = endpoint + "&diet=" + dietTerm;
  console.log(endpoint);

  if (allergiesTerm) endpoint = endpoint + "&intolerances=" + allergiesTerm;
  console.log(endpoint);

  if (mealTypesTerm) endpoint = endpoint + "&type=" + mealTypesTerm;
  console.log(endpoint);

  const response = await axios.get(endpoint);
  // console.log(response);
  const searchResults = response.data;
  console.log(searchResults);
  return searchResults.results;
};

export const getFullRecipeInfoFromSpoonacular = async (
  searchResultsRecipes
) => {
  let fullRecipeData = [];

  searchResultsRecipes.forEach(async (recipe) => {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`
    );
    const recipeData = response.data;
    console.log(recipeData);
    fullRecipeData.push(recipeData);
  });

  return fullRecipeData;
};
