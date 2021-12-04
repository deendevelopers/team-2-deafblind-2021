export const addRecipesToSavedRecipes = (savedRecipes, newRecipe) => {
    if(savedRecipes.includes(newRecipe)) return savedRecipes;
    return [...savedRecipes, newRecipe];
}