import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";


import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import { auth, createUserProfileDocument } from "../firebase/firebaseUtils";
import { setCurrentUser } from "../redux/user/userActions";

const Layout = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
      // console.log("Ran the USEEFFECT in Layout.js");
      const unsubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          // console.log("user is logged in");
          const userRef = await createUserProfileDocument(user);
          onSnapshot(userRef, (snapShot) => {
            // console.log(snapShot.data())
            dispatch(
              setCurrentUser({
                id: snapShot.id,
                ...snapShot.data(),
              })
            );
          });
        } else {
          // User is signed out
          console.log("Layout.js, no user is logged in!");
          // i.e. setting our redux current user state to null
          dispatch(setCurrentUser(user));
        }
      });
  
      // Below is to clean up when component unmounts, i.e. prevent memory leaks by
      // unsubscribing from auth.
      return () => {
        unsubscribeFromAuth();
      };
    }, [dispatch]);

    return (
        <React.Fragment>
            <Navbar />
            { children }
            <Footer />
        </React.Fragment>
    )
}

export default Layout;