import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import './App.scss';
// import RecipeSearchPage from "./pages/recipe-search/RecipeSearchPage";
import RandomRecipePage from "./pages/random-recipe/RandomRecipePage";
import NavBar from "./components/navbar/NavBar";
import UserDashboardPage from "./pages/user-dashboard/UserDashboardPage";
import SignInPage from "./pages/sign-in/SignInPage";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, createUserProfileDocument } from "./firebase/firebaseUtils";
import { setCurrentUser } from "./redux/user/userActions";
import { onSnapshot } from "firebase/firestore";
import RecipeDetailPage from "./pages/recipe-detail/RecipeDetailPage";


const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);

  useEffect(() => {
    console.log("Ran the USEEFFECT in App.js");
    const unsubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // console.log("App.js, user with following uid is logged in", uid);
        // ...
        const userRef = await createUserProfileDocument(user);
        onSnapshot(userRef, snapShot => {
          // console.log(snapShot.data())

         
            dispatch(setCurrentUser({
              id: snapShot.id, 
              ...snapShot.data()
          }));
        });
      } else {
        // User is signed out
        // ...
        console.log("App.js, no user is logged in!");
        // i.e. setting our redux current user state to null 
        dispatch(setCurrentUser(user));
      }
    });

    // Below is to clean up when component unmounts, i.e. prevent memory leaks by 
    // unsubscribing from auth.
    return () => {
      console.log("Ran Unsubscribe");
      unsubscribeFromAuth();
    };
  }, [dispatch]);
  
  return (
    <React.Fragment>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage}/>
        {/* <Route exact path="/recipe-search" component={RecipeSearchPage} /> */}
        <Route path="/random-recipe" component={RandomRecipePage} />
        <Route path="/dashboard" render={ () => !currentUser ? <Redirect to="/" /> : <UserDashboardPage /> } />
        <Route path="/sign-in" render={ () => currentUser ? <Redirect to="/" /> : <SignInPage /> } />
        <Route path="/recipes/:recipeId" component={RecipeDetailPage} />
      </Switch>
    </ React.Fragment>
  );
}

export default App;
