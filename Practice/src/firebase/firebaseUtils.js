import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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

  // Initialise Firebase
initializeApp(firebaseConfig);

// Initialise firestore
const db = getFirestore();

// Initialise Auth
const auth = getAuth();

const analytics = getAnalytics();

export { db, auth, createUserProfileDocument };