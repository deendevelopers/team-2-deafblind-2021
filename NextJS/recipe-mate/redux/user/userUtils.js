import { db } from "../../firebase/firebaseUtils";
import { doc, getDoc, setDoc } from "firebase/firestore";


// ________________________________________________________
// Firebase related functions

export const addRecipeSlugToUserSavedRecipesSlugsInFirebase = async (userId, recipeSlug) => {
    if(!userId) return;

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()){
        // console.log(userSnap.data());
        const { savedRecipesSlugs, ...remainingData } = userSnap.data();
        // console.log(savedRecipesIds, remainingData);
        if(savedRecipesSlugs){
            if (savedRecipesSlugs.includes(recipeSlug)) return;
            console.log("adding NEW recipe!");
            await setSavedRecipeSlugs({ userRef, remainingData, updatedSavedRecipesSlugs: [...savedRecipesSlugs, recipeSlug]})
        } else {
            console.log("Adding FIRST recipe!!!!");
            await setSavedRecipeSlugs({ userRef, remainingData, updatedSavedRecipesSlugs: [recipeSlug]})
        }
    }
}

const setSavedRecipeSlugs = async({userRef, remainingData, updatedSavedRecipesSlugs}) => {
    try {
        await setDoc(userRef, {
            savedRecipesSlugs: updatedSavedRecipesSlugs,
            ...remainingData
        });

    } catch (error) {
        console.log(error.message)
    }
}
