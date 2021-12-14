
export const filterRecipes = ({ searchTerm, recipes, advancedSearch }) => {
    
    let matchedRecipes = recipes.filter(recipe => {
        const { title, summary } = recipe.fields;
        return title.toLowerCase().includes(searchTerm.toLowerCase()) || summary.toLowerCase().includes(searchTerm.toLowerCase())
    });

    if(advancedSearch && matchedRecipes.length>0){
        console.log("Advanced Search");
    }

    console.log(matchedRecipes);
    return matchedRecipes;
}