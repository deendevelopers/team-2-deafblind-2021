import axios from "axios";

export const fetchRandomRecipe = async ({ isCustomSearch, customEndPoint }) => {
  // const API_KEY = "1fae167ef83a4a56b244effeb1a158ec";
  const API_KEY = "bba9229204a74ae79374bfc68ef3117f";

  const fetchRandomRecipeFromSpoonacular = async ({ randomCustomEndPoint }) => {
    let randomRecipeData;
    let validRecipeWithInstructions;

    while (!validRecipeWithInstructions) {
      validRecipeWithInstructions = false;

      const response = await axios.get(
        "https://api.spoonacular.com/recipes/random?apiKey=" +
          API_KEY +
          randomCustomEndPoint
      );
      console.log("Ran Custom fetch Once");
      console.log(response);
      const { recipes } = await response.data;
      randomRecipeData = recipes[0];
      console.log(randomRecipeData);

      //return here if no results found to prevent infinite loop
      if (!randomRecipeData) return randomRecipeData;

      // console.log("Valid recipes", randomRecipeData.analyzedInstructions.length !==0 );

      if (
        randomRecipeData &&
        randomRecipeData.analyzedInstructions.length !== 0
      ) {
        validRecipeWithInstructions = true;
      }
    }

    console.log(randomRecipeData);
    return randomRecipeData;
  };

  if (!isCustomSearch) {
    const randomRecipeData = await fetchRandomRecipeFromSpoonacular({
      randomCustomEndPoint: "",
    });
    return randomRecipeData;
  } else {
    console.log("Ran Custom fetch");
    const randomRecipeData = await fetchRandomRecipeFromSpoonacular({
      randomCustomEndPoint: customEndPoint,
    });
    return randomRecipeData;
  }
};

export function generateCustomEndPoint(customRandomSearch) {
  // for each custom search state - add to tags separated by commas to endpoint
  const customEndPoint = ["&tags="];
  Object.values(customRandomSearch).forEach((parameter) =>
    customEndPoint.push(parameter + ",")
  );
  console.log(customEndPoint);

  // remove last comma
  const lastElement = customEndPoint[customEndPoint.length - 1];
  console.log(lastElement);
  const lastCharacterOfLastElement = lastElement[lastElement.length - 1];
  if (lastCharacterOfLastElement === ",") {
    customEndPoint[customEndPoint.length - 1] = lastElement.slice(0, -1);
  }
  console.log(customEndPoint);

  const customEndPointString = customEndPoint.join("").toLowerCase();
  console.log(customEndPointString);
  return customEndPointString;
}

export function getUniqueIngredients(extendedIngredients) {
  const ingredientsNames = extendedIngredients.map(
    (ingredient) =>
      ingredient.measures.metric.amount +
      ` ${ingredient.measures.metric.unitShort}` +
      ` ${ingredient.originalName}`
  );
  //Remove duplicates:
  const uniqueIngredients = [...new Set(ingredientsNames)];
  return uniqueIngredients;
}
