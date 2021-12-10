import { db } from "../../firebase/firebaseUtils";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const addNewRecipeId = (savedRecipesIds, newRecipeId) => {
    if(savedRecipesIds.includes(newRecipeId)) return savedRecipesIds;
    return [...savedRecipesIds, newRecipeId];
}

// ________________________________________________________
// Firebase related functions

export const addRecipeIdToUserSavedRecipesIdsInFirebase = async (userId, recipeId) => {
    if(!userId) return;

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()){
        // console.log(userSnap.data());
        const { savedRecipesIds, ...remainingData } = userSnap.data();
        // console.log(savedRecipesIds, remainingData);
        if(savedRecipesIds){
            if (savedRecipesIds.includes(recipeId)) return;
            console.log("adding NEW recipe!");
            await setSavedRecipeIds({ userRef, remainingData, updatedSavedRecipesIds: [...savedRecipesIds, recipeId]})
        } else {
            console.log("Adding FIRST recipe!!!!");
            await setSavedRecipeIds({ userRef, remainingData, updatedSavedRecipesIds: [recipeId]})
        }
    }
}

const setSavedRecipeIds = async({userRef, remainingData, updatedSavedRecipesIds}) => {
    try {
        await setDoc(userRef, {
            savedRecipesIds: updatedSavedRecipesIds,
            ...remainingData
        });

    } catch (error) {
        console.log(error.message)
    }
}

export const deleteRecipeIdToUserSavedRecipesIdsInFirebase = async (userId, recipeId) => {
    if(!userId) return;

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()){
        // console.log(userSnap.data());
        const { savedRecipesIds, ...remainingData } = userSnap.data();
        // console.log(savedRecipesIds, remainingData);

        // If recipe does not exist in savedRecipesIds in firebase - then nothing to delete 
        if (!savedRecipesIds.includes(recipeId)) return;

        const updatedSavedRecipesIds = savedRecipesIds.filter(savedRecipeId => savedRecipeId !== recipeId);
        console.log("DELETING recipe!");
        await setSavedRecipeIds({ userRef, remainingData, updatedSavedRecipesIds: updatedSavedRecipesIds })
    }
}