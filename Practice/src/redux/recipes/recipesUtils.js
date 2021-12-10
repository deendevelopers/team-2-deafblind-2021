import axios from "axios";
import { db } from "../../firebase/firebaseUtils";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

export const addRecipesToSavedRecipes = (savedRecipes, newRecipe) => {
  if (savedRecipes.includes(newRecipe)) return savedRecipes;
  return [...savedRecipes, newRecipe];
};

// ________________________________________________________________________
// Spoonacular 

const API_KEY = "6f9a324efd194a8ba56f0dc75b7b1f2b";
// const API_KEY = "a11e74b4f63c43acbb84d48de0e61221";
// const API_KEY = "f5d5adab98d54ebda09f396de1180a1a";
// const API_KEY = "1fae167ef83a4a56b244effeb1a158ec";
// const API_KEY = "bba9229204a74ae79374bfc68ef3117f";

export const fetchRecipeSearchResultsFromSpoonacular = async ({
  searchQuery,
  dietTerm,
  allergiesTerm,
  mealTypesTerm,
}) => {
  const recipeSearchQuery = searchQuery.split(" ").join(",");
  console.log(recipeSearchQuery);
  let endpoint = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&query=${recipeSearchQuery}`;

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

export const getFullRecipeInfoFromSpoonacular = async (searchResultsRecipes) => {
  let fullRecipeData = [];

  try {
    // Replace .forEach with for-of because async-await doesnt work in sequence for .forEach!!!
    for (const recipe of searchResultsRecipes){
      const response = await axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`);
      const recipeData = await response.data;
      // console.log(recipeData);
      fullRecipeData.push(recipeData);
    }
  } catch (error) {
    console.log(error.message);
  }

  // console.log(fullRecipeData);
  return fullRecipeData;
};

// _______________________________
// Firebase functions

export const addRecipeToFirebase = async (recipe) => {
  console.log("Adding recipe to Firebase", recipe);
  if(!recipe) return;

  const reciperRef = collection(db, "recipes");
  
  // Checking whether recipe already exists on Firebase or not:
  const recipeQuery = query(reciperRef, where("id", "==", recipe.id));
  // console.log({ recipeQuery });
  const recipeQueryDocResults = await getDocs(recipeQuery);
  console.log({ recipeQueryDocResults });
  console.log(recipeQueryDocResults.empty);

  // if recipe already stored then just return here
  if(!recipeQueryDocResults.empty) return;
  // otherwise add recipe to firebase - use try-catch to catch any errors
  try {
      await addDoc(reciperRef, recipe);
  } catch (error) {
      console.log("Error adding recipe to Firebase", error.message);
  }
}

export const getSavedRecipesFromFirebase = async (savedRecipesIds) => {
  if(!savedRecipesIds) return;

  const reciperRef = collection(db, "recipes");
  
  let savedRecipes = [];

  // Firebase has 10 equality clause limit
  if(savedRecipesIds.length <= 10) {
      console.log({ savedRecipesIds });
      const recipeQuery = query(reciperRef, where("id", "in", savedRecipesIds));
      const recipeQueryDocResults = await getDocs(recipeQuery);
      console.log({ recipeQueryDocResults });

      recipeQueryDocResults.forEach((doc) => {
          console.log(doc.data());
          // What to do?
          // .........
          savedRecipes.push(doc.data());
      })
  } else {
      let remainingRecipesIds = [...savedRecipesIds];

      while(remainingRecipesIds.length > 0){
          // Initialise an empty array to save the recipe Ids to process
          let recipesIdsToProcess = [];

          // Add a batch of 10 from the total/remaining recipes Ids array
          recipesIdsToProcess.push(...remainingRecipesIds.splice(0, 10));


          const recipeQuery = query(reciperRef, where("id", "in", recipesIdsToProcess));
          const recipeQueryDocResults = await getDocs(recipeQuery);
          console.log({ recipeQueryDocResults });
      
          recipeQueryDocResults.forEach((doc) => {
              console.log(doc.data());
              // What to do?
              // .........
              savedRecipes.push(doc.data());
          })
      }
  }
  console.log({savedRecipes});
  return savedRecipes;
}

export const addCustomRecipeToFirebaseCustomRecipes = async (recipe) => {
  console.log("Adding CUSTOM recipe to Firebase", recipe);
  if(!recipe) return;

  const reciperRef = collection(db, "customRecipes");
  
  // Checking whether recipe already exists on Firebase or not:
  const recipeQuery = query(reciperRef, where("id", "==", recipe.id));
  // console.log({ recipeQuery });
  const recipeQueryDocResults = await getDocs(recipeQuery);
  console.log({ recipeQueryDocResults });
  console.log(recipeQueryDocResults.empty);

  // if recipe already stored then just return here
  if(!recipeQueryDocResults.empty) return;
  // otherwise add recipe to firebase - use try-catch to catch any errors
  try {
      await addDoc(reciperRef, recipe);
  } catch (error) {
      console.log("Error adding CUSTOM recipe to Firebase", error.message);
  }
}
