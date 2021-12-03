export const addNewRecipe = (savedRecipes, newRecipeId) => {
    if(savedRecipes.includes(newRecipeId)) return savedRecipes;
    return [...savedRecipes, newRecipeId];
}