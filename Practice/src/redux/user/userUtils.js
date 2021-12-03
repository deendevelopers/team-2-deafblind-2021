export const addNewRecipeId = (savedRecipesIds, newRecipeId) => {
    if(savedRecipesIds.includes(newRecipeId)) return savedRecipesIds;
    return [...savedRecipesIds, newRecipeId];
}