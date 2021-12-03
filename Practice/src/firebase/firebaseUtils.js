import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, setDoc, addDoc, query, where, getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB1bmw69hNostB4I4sGwD97IWxqeM0qScc",
    authDomain: "recipemate-8e34c.firebaseapp.com",
    projectId: "recipemate-8e34c",
    storageBucket: "recipemate-8e34c.appspot.com",
    messagingSenderId: "119304070105",
    appId: "1:119304070105:web:a7250523930b5842942fc8",
    measurementId: "G-7BQV5VF63B"
  };

const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    console.log(userAuth.uid)
    const userRef = doc(db, "users", userAuth.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        // doc.data() will be undefined in this case
        console.log("No such document! Therefore will make one!");

        const { displayName, email } = userAuth

        const createdAt = new Date()
  
        //Therefore if the snapshot doesnt exist then we will create a new user 
        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
  
        } catch (error) {
            console.log('error creating user', error.message)
        }

    } else {
        console.log("Document data:", userSnap.data());
    }
    return userRef;
}

const addRecipeToUserSavedRecipesInFirebase = async (userId, recipeId) => {
    if(!userId) return;

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()){
        console.log(userSnap.data());
        const { createdAt, displayName, email, savedRecipes, ...remainingData } = userSnap.data();
        console.log(createdAt, displayName, email, savedRecipes, remainingData);

        if(savedRecipes){
            if (savedRecipes.includes(recipeId)) return;
            
            try {
                console.log("adding NEW recipe!");
                await setDoc(userRef, {
                    displayName,
                    email,
                    createdAt,
                    savedRecipes: [...savedRecipes, recipeId],
                    ...remainingData
                });
      
            } catch (error) {
                console.log('error adding user recipe', error.message)
            }

        } else {
            console.log("Adding FIRST recipe!!!!");
            try {
                await setDoc(userRef, {
                    displayName,
                    email,
                    createdAt,
                    savedRecipes: [recipeId],
                    ...remainingData
                });
      
            } catch (error) {
                console.log('error adding first user recipe', error.message)
            }
        }
    }
}

// const getSavedRecipesForUserFromFirebase = async (userId) => {
//     if(!userId) return;
//     const userRef = doc(db, "users", userId);
//     const userSnap = await getDoc(userRef);
//     const { savedRecipes } = userSnap.data();
//     return savedRecipes;
// }

const addRecipeToFirebase = async (recipe) => {
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

const getSavedRecipesFromFirebase = async (savedRecipesIds) => {
    if(!savedRecipesIds) return;

    
}

  // Initialise Firebase
initializeApp(firebaseConfig);

// Initialise firestore
const db = getFirestore();

// Initialise Auth
const auth = getAuth();

const analytics = getAnalytics();

export { db, auth, createUserProfileDocument, addRecipeToUserSavedRecipesInFirebase, addRecipeToFirebase, getSavedRecipesFromFirebase };