
export const filterRecipes = ({ searchTerm, recipes, dietTerm, allergiesTerm, mealTypesTerm }) => {
    
    let matchedRecipes = recipes.filter(recipe => {
        const { title, summary } = recipe.fields;
        return title.toLowerCase().includes(searchTerm.toLowerCase()) || summary.toLowerCase().includes(searchTerm.toLowerCase())
    });

    // Advanced Search
    if(matchedRecipes.length>0){
        console.log("Advanced Search");
        console.log(dietTerm)
        if(dietTerm.length>0){
            console.log("diet Term advanced search")
            matchedRecipes = matchedRecipes.filter(recipe => {
                const { dietaryDetails } = recipe.fields;
                const dishDietaryDetails = dietaryDetails.map(term => term.toLowerCase());
                //dishTerm is the user's diets
                const includesDiets = dietTerm.every(diet => dishDietaryDetails.includes(diet.toLowerCase()))
                console.log(includesDiets);
                return includesDiets;
            })
            console.log("Recipes after diet check", matchedRecipes);
        }
        console.log(allergiesTerm)
        if(allergiesTerm.length>0){
            console.log("allergies Term advanced search")
            matchedRecipes = matchedRecipes.filter(recipe => {
                const { allergies } = recipe.fields;
                const dishAllergies = allergies.map(term => term.toLowerCase());
                //allergiesTerms is the user's allergies
                const isAllergyFree = allergiesTerm.every(allergy => !dishAllergies.includes(allergy.toLowerCase()))
                return isAllergyFree;
            })
        }
        console.log(mealTypesTerm)
        if(mealTypesTerm.length>0){
            console.log("meal Types advanced search")
            matchedRecipes = matchedRecipes.filter(recipe => {
                const { mealType } = recipe.fields;
                const dishMealTypes = mealType.map(term => term.toLowerCase());
                //mealTypesTerm is the user's meal type request
                //Use array method .SOME() here instead because if even one match is enough
                const includesMealTypes = mealTypesTerm.some(type => dishMealTypes.includes(type.toLowerCase()))
                return includesMealTypes;
            })
        }
    }

    console.log(matchedRecipes);
    return matchedRecipes;
}