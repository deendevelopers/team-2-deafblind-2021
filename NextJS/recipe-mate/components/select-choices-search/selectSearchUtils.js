
export const filterRecipesBySelection = ({ recipes, selection }) => {
    console.log(selection);
    console.log(recipes);
    let filteredRecipes = [...recipes];
    switch (selection) {
        case "indian":
            filteredRecipes = filteredRecipes.filter(recipe => recipe.fields.cuisine.toLowerCase().includes(selection));
            break;
        case "vegetarian":
            filteredRecipes = filteredRecipes.filter(recipe => {
                const dishDietaryDetails = recipe.fields.dietaryDetails.map(diet => diet.toLowerCase());
                return dishDietaryDetails.includes(selection);
            })
            break;
        case "dessert":
        case "salad":
            filteredRecipes = filteredRecipes.filter(recipe => {
                const dishMealTypes = recipe.fields.mealType.map(type => type.toLowerCase());
                return dishMealTypes.includes(selection);
            })          
            break;
        case "oven":
            filteredRecipes = filteredRecipes.filter(recipe => {
                const dishRequiredEquipment = recipe.fields.requiredEquipment.map(type => type.toLowerCase());
                return dishRequiredEquipment.includes(selection);
            })        
            break;
        case "easy":
            console.log("ran Easy");
            console.log(filteredRecipes);
            filteredRecipes = filteredRecipes.filter(recipe => {
                const dishCookingTime = recipe.fields.cookingTime;
                return dishCookingTime<=20;
            })        
            break;          
      }

      return filteredRecipes;
}