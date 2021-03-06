import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import { ChakraProvider, extendTheme, Box } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
import NavBar from "./components/navbar/NavBar";
import UserDashboardPage from "./pages/user-dashboard/userDashboardPage";
import SignInPage from "./pages/sign-in/SignInPage";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth, createUserProfileDocument } from "./firebase/firebaseUtils";
import { setCurrentUser } from "./redux/user/userActions";
import { onSnapshot } from "firebase/firestore";
import RecipeDetailPage from "./pages/recipe-detail/RecipeDetailPage";
import AddRecipePage from "./pages/add-recipe/AddRecipePage";
import Register from "./components/register/Register";
import Login from "./components/log-in/Login";

const App = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const theme = extendTheme({
    components: {
      Steps,
    },
  });

  useEffect(() => {
    console.log("Ran the USEEFFECT in App.js");
    const unsubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // console.log("App.js, user with following uid is logged in", uid);
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
        console.log("App.js, no user is logged in!");
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
    <ChakraProvider theme={theme}>
      <React.Fragment>
      <Box style={{ position: "sticky", top: 0, zIndex: 10, width: "100vw" }} bg="green.100">
        <NavBar />
      </Box>
        <Switch>
        <Box style={{ position: "relative", zIndex: 1, width: "100vw" }} >
          <Route exact path="/" component={HomePage} />
          <Route
            path="/dashboard"
            render={() =>
              !currentUser ? (
                <Redirect to="/" />
              ) : (
                <Box px={2}>
                  <UserDashboardPage />
                </Box>
              )
            }
          />
          <Route path="/sign-in" render={() => (currentUser ? <Redirect to="/" /> : <SignInPage />)} />
          <Route path="/recipes/:recipeId" component={RecipeDetailPage} />
          <Route path="/add-recipe" component={AddRecipePage} />
          <Route path="/register" render={() => (currentUser ? <Redirect to="/" /> : <Register />)} />
          <Route path="/login" render={() => (currentUser ? <Redirect to="/" /> : <Login />)} />
          </Box>
        </Switch>
      </React.Fragment>
    </ChakraProvider>
  );
};

export default App;