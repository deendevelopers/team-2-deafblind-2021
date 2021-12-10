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

// Creates a user profile document in the /users endpoint for an authorised user in firestore
// database to store email and username and other data which can then easily be accessed  
const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = doc(db, "users", userAuth.uid);
    const userSnap = await getDoc(userRef);

    //Therefore if the snapshot doesnt exist then we will create a new user 
    if (!userSnap.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
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
        // Authorised user ALREADY has user profile document
        // console.log("Document data:", userSnap.data());
    }
    return userRef;
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

export { db, auth, storage, createUserProfileDocument, addImageFileToFirebaseStorage };