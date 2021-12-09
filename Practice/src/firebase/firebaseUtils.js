import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, setDoc, addDoc, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
        // console.log("Document data:", userSnap.data());
    }
    return userRef;
}

const addRecipeIdToUserSavedRecipesIdsInFirebase = async (userId, recipeId) => {
    if(!userId) return;

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()){
        // console.log(userSnap.data());
        const { createdAt, displayName, email, savedRecipesIds, ...remainingData } = userSnap.data();
        // console.log(createdAt, displayName, email, savedRecipesIds, remainingData);

        if(savedRecipesIds){
            if (savedRecipesIds.includes(recipeId)) return;
            
            try {
                console.log("adding NEW recipe!");
                await setDoc(userRef, {
                    displayName,
                    email,
                    createdAt,
                    savedRecipesIds: [...savedRecipesIds, recipeId],
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
                    savedRecipesIds: [recipeId],
                    ...remainingData
                });
      
            } catch (error) {
                console.log('error adding first user recipe', error.message)
            }
        }
    }
}

const deleteRecipeIdToUserSavedRecipesIdsInFirebase = async (userId, recipeId) => {
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

        try {
            console.log("DELETING recipe!");
            await setDoc(userRef, {
                savedRecipesIds: updatedSavedRecipesIds,
                ...remainingData
            });
    
        } catch (error) {
            console.log('error adding user recipe', error.message)
        }
    }
}

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

const addCustomRecipeToFirebaseCustomRecipes = async (recipe) => {
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

const addImageFileToFirebaseStorage = async (id, imageFile) => {
    const storageRef = ref(storage, `recipes/images/${id}.jpg`);
    
    const imageSnapshot = await uploadBytes(storageRef, imageFile);

    console.log("snapshot", imageSnapshot);
    console.log("snapshot.metadata.fullPath", imageSnapshot.metadata.fullPath);
    console.log('uploaded successful');

    const url = await getDownloadURL(ref(storage, imageSnapshot.metadata.fullPath))
           
    console.log("url", url);

    const recipeCollectionRef = collection(db, "customRecipes");
    
    // Checking whether recipe already exists on Firebase or not:
    const recipeQuery = query(recipeCollectionRef, where("id", "==", id));
    // console.log({ recipeQuery });
    const recipeQueryDocResults = await getDocs(recipeQuery);
    const recipeId = recipeQueryDocResults.docs[0].id;
    console.log({ recipeId });
    console.log(recipeQueryDocResults.empty);


    const recipeRef = doc(db, "customRecipes", recipeId);
    const recipeSnap = await getDoc(recipeRef);

    if(recipeSnap.exists()){
        // console.log(userSnap.data());
        const { imageUrl, ...remainingData } = recipeSnap.data();
        // console.log(savedRecipesIds, remainingData);

        try {
            console.log("Adding IMAGEURL to custom recipe!");
            await setDoc(recipeRef, {
                imageUrl: url,
                ...remainingData
            });
    
        } catch (error) {
            console.log('error adding IMAGE URL to custom recipe', error.message)
        }
    }
}

  // Initialise Firebase
initializeApp(firebaseConfig);

// Initialise firestore
const db = getFirestore();

// Initialise firebase storage
const storage = getStorage();

// Initialise Auth
const auth = getAuth();

const analytics = getAnalytics();

export { db, auth, storage, createUserProfileDocument, addRecipeIdToUserSavedRecipesIdsInFirebase, addRecipeToFirebase, getSavedRecipesFromFirebase, deleteRecipeIdToUserSavedRecipesIdsInFirebase, addCustomRecipeToFirebaseCustomRecipes, addImageFileToFirebaseStorage };