import axios from "axios";

export const fetchRandomRecipe = async ( { isCustomSearch, customEndPoint } ) => {

    const API_KEY = "1fae167ef83a4a56b244effeb1a158ec";

    if(!isCustomSearch){
        const response = await axios.get("https://api.spoonacular.com/recipes/random?apiKey=" + API_KEY);
        console.log("Ran fetch")
        console.log(response);
        const { recipes } = await response.data;
        const randomRecipeData = recipes[0];
        return randomRecipeData
    } else {
        const response = await axios.get("https://api.spoonacular.com/recipes/random?apiKey=" + API_KEY + customEndPoint);
        console.log("Ran Custom fetch")
        console.log(response);
        const { recipes } = await response.data;
        const randomRecipeData = recipes[0];
        return randomRecipeData
    }
}

export function generateCustomEndPoint (customRandomSearch) {
    // for each custom search state - add to tags separated by commas to endpoint
    const customEndPoint = ["&tags="];
    Object.values(customRandomSearch).forEach(parameter => customEndPoint.push(parameter+ ","));
    console.log(customEndPoint);
    
    // remove last comma
    const lastElement = customEndPoint[customEndPoint.length - 1];
    console.log(lastElement);
    const lastCharacterOfLastElement = lastElement[lastElement.length -1 ];
    if(lastCharacterOfLastElement === ",") {
        customEndPoint[customEndPoint.length -1] = lastElement.slice(0, -1);
    }
    console.log(customEndPoint);

    const customEndPointString = customEndPoint.join("").toLowerCase();
    console.log(customEndPointString);
    return customEndPointString;
}

export function getUniqueIngredients (extendedIngredients) {
    const ingredientsNames = extendedIngredients.map(ingredient => ingredient.name);
        //Remove duplicates:
    const uniqueIngredients = [...new Set(ingredientsNames)];
    return uniqueIngredients;
}