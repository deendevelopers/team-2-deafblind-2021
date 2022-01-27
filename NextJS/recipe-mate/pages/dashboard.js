import { signOut } from "@firebase/auth";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../firebase/firebaseUtils";
import { Heading, Box, Flex, Button, Center, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";

export const getStaticProps = async() => {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });
  
    const response = await client.getEntries({
      content_type: "recipe",
    });
  
    return {
      props: {
        recipes: response.items,
      },
    }
  }

const UserDashboardPage = ({ recipes }) => {
    const router = useRouter();

    const currentUser = useSelector((state) => state.user.currentUser);

    // Using "?" instead of "&&" to take care of null/undefined states of values
    const userSavedRecipes = recipes.filter(recipe => currentUser?.savedRecipesSlugs?.includes(recipe.fields.slug));
    // const userSavedRecipes = (currentUser && currentUser.savedRecipesSlugs) && recipes.filter(recipe => currentUser.savedRecipesSlugs.includes(recipe.fields.slug));
    // console.log({userSavedRecipes});
    // const dispatch = useDispatch();

    useEffect(() => {
        "On snapshot ran again"
        const unsubscribeFromAuth = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // console.log({user});
                console.log("User is logged in!")
            } else {
                console.log("Dashboard.js, no user is logged in!");
                // use .replace so that unauthenticated user cannot simply use back button to try and get back to dashboard page!
                router.replace("/sign-in");
            }
          });
          
        return () => unsubscribeFromAuth();
    }, [currentUser])

    const handleSignOut = async () => {
        try {
        await signOut(auth);
        } catch (error) {
        console.log(error);
        }
    };

    if (currentUser){
        return (
            <Flex as="main" direction="column" p={3} alignItems="center">
                <Flex as="section" wrap="wrap" justifyContent="center" gap={{ base: "1rem", md: "3rem"}} mb={6}>
                    <Heading as="h1" textAlign="center" textTransform="capitalize">Welcome to your dashboard <Text as="span">{currentUser.displayName}</Text> </Heading>
                    <Button onClick={handleSignOut}>Sign-Out</Button>
                </Flex>
                <Box as="section" px={4}>
                    <Heading as="h2" textAlign="center">Your Saved Recipes</Heading>
                    <Flex direction="column">
                    {userSavedRecipes &&
                        userSavedRecipes.map((recipe) => (
                        <RecipeCard key={recipe.sys.id} recipe={recipe} isDashboard />
                        ))}
                    </Flex>
                </Box>
            </Flex>
        );
    }
    return <Heading as="h3">Please wait while we authenticate you.</Heading>

};

export default UserDashboardPage;