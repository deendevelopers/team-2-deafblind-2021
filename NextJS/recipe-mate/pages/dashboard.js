import { signOut } from "@firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebaseUtils";
// import { getSavedRecipes } from "../../redux/recipes/recipesActions";
// import RecipeCard from "../../components/recipe-card/RecipeCard";
import { Heading, Box, Flex, Button, Center, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";



const UserDashboardPage = () => {
    const router = useRouter();

    const currentUser = useSelector((state) => state.user.currentUser);

    // const savedRecipesData = useSelector((state) => state.recipes.savedRecipes);
    // const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // console.log({user});
                console.log("User is logged in!")
            } else {
                console.log("App.js, no user is logged in!");
                // use .replace so that unauthenticated user cannot simply use back button to try and get back to dashboard page!
                router.replace("/sign-in");
            }
          });
          
        return () => unsubscribeFromAuth();
    }, [currentUser])

//   useEffect(() => {
//     dispatch(getSavedRecipes(savedRecipesIds));
//   }, [dispatch, savedRecipesIds, savedRecipesIds.length]);

    const handleSignOut = async () => {
        try {
        await signOut(auth);
        } catch (error) {
        console.log(error);
        }
    };

    if (currentUser){
        return (
            <React.Fragment>
                <Heading as="h2">Welcome to your dashboard<Text>{currentUser.displayName}</Text></Heading>
            <main className="user-dashboard-page-main">
                <Center mb={3}>
                    <Button onClick={handleSignOut}>Sign-Out</Button>
                </Center>
                {/* <section>
                <Box px={4}>
                    <Heading as="h3">Your Saved Recipes</Heading>
                    <Flex direction="column">
                    {savedRecipesData &&
                        savedRecipesData.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} isDashboard />
                        ))}
                    </Flex>
                </Box>
                </section> */}
            </main>
            </React.Fragment>
        );
    }
    return <Heading as="h3">Please wait while we authenticate you.</Heading>

};

export default UserDashboardPage;