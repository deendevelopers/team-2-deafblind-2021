import axios from "axios";

// const API_KEY = "1fae167ef83a4a56b244effeb1a158ec";
// const API_KEY = "bba9229204a74ae79374bfc68ef3117f";
// const API_KEY = "f90bff5221f04569b84f29fa3e7f4c17";
const API_KEY = "a11e74b4f63c43acbb84d48de0e61221";
// const API_KEY = "f5d5adab98d54ebda09f396de1180a1a";

export const fetchRandomRecipe = async ( { isCustomSearch, customEndPoint } ) => {

    const fetchRandomRecipeFromSpoonacular = async ({ randomCustomEndPoint }) => {
        let randomRecipeData;
        let validRecipeWithInstructions;

        while(!validRecipeWithInstructions){
            validRecipeWithInstructions = false;

            const response =  await axios.get("https://api.spoonacular.com/recipes/random?apiKey=" + API_KEY + randomCustomEndPoint);
            console.log("Ran Custom fetch Once")
            console.log(response);
            const { recipes } = await response.data;
            randomRecipeData = recipes[0];
            console.log(randomRecipeData);

            //return here if no results found to prevent infinite loop
            if(!randomRecipeData) return randomRecipeData;

            // console.log("Valid recipes", randomRecipeData.analyzedInstructions.length !==0 );

            if(randomRecipeData && randomRecipeData.analyzedInstructions.length !==0 ){
                validRecipeWithInstructions = true;
            }
        }

        console.log(randomRecipeData);
        return randomRecipeData;
    }

    if(!isCustomSearch){
        const randomRecipeData = await fetchRandomRecipeFromSpoonacular({ randomCustomEndPoint: "" });
        return randomRecipeData;
    } else {
        console.log("Ran Custom fetch")
       const randomRecipeData = await fetchRandomRecipeFromSpoonacular({ randomCustomEndPoint: customEndPoint });
       return randomRecipeData;
    }
}

export const fetchRandomChoicesRecipes = async ({choice }) => {
    console.log(choice);
    let endpoint = "https://api.spoonacular.com/recipes/" ; 
    switch(choice){
        case "indian":
        case "vegetarian":
        case "dessert":
        case "salad":
            endpoint = endpoint + "random?apiKey=" + API_KEY+ "&tags="+choice
            break;
        case "oven":
            endpoint = endpoint + "complexSearch?apiKey=" + API_KEY + "&equipment="+choice
            break;
        case "easy":
            endpoint = endpoint + "complexSearch?apiKey=" + API_KEY + "&maxReadyTime="+15
            break;
        default:
            endpoint = endpoint + "random?apiKey=" + API_KEY
    }
    console.log(endpoint);
    try {
        const response =  await axios.get(endpoint);
        console.log("Ran Random CHOICES fetch")
        console.log(response);
        const responseData = await response.data;
        let randomRecipeData = responseData;
        console.log(randomRecipeData);
        if(!randomRecipeData.recipes){
            const recipe = randomRecipeData.results[0];
            console.log(recipe);
            const responseRecipeFullInfo = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`)
            const recipeData = responseRecipeFullInfo.data;
            console.log(recipeData);
            randomRecipeData = recipeData;
        } else{
            randomRecipeData = randomRecipeData.recipes[0]
        }

        return randomRecipeData;
    } catch (error) {
        console.log(error)
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