import { createClient } from "contentful"
import { Box, Center, Heading, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Fallback from "../../components/Fallback";
import ChakraCustomButton from "../../components/ChakraCustomButton";
import { useRouter } from "next/router";
import React from "react";
import RecipeArticle from "../../components/RecipeArticle";
import { useDispatch, useSelector } from "react-redux";
import SaveRecipeButton from "../../components/SaveRecipeButton";
import { addRecipeSlugToUserSavedRecipesSlugs } from "../../redux/user/userActions";
import SignInAndSave from "../../components/SignInAndSave";

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {

    const response = await client.getEntries({
        content_type: "recipe",
    });

    const recipePaths = response.items.map(item => ({ params: { slug: item.fields.slug } }))

    return {
        paths: recipePaths,
        fallback: true,
    }
}

export const getStaticProps = async({ params }) => {

    const { items } = await client.getEntries({
        content_type: "recipe",
        "fields.slug": params.slug
    });

    if (!items.length) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {
            recipe: items[0],
        },
        revalidate: 5,
    }
}

const RecipeDetails = ({ recipe }) => {    
    const router = useRouter();
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.currentUser);

    if(!recipe) return <Fallback />

    const { slug } = recipe.fields;

    const handleSaveRecipe = () => {
        // Save/add recipe slug to redux saved recipes array in current user slice
        dispatch(addRecipeSlugToUserSavedRecipesSlugs({ userId: currentUser.id, recipeSlug: slug }));
    }
    return (
        <Flex as="main" direction="column" alignItems="center">
            <Head>
                <title>{recipe.fields.title}</title>
                <meta name="description" content={recipe.fields.summary} />
            </Head>
            <RecipeArticle recipe={recipe} />
            { currentUser ? <SaveRecipeButton savedRecipesSlugs={currentUser.savedRecipesSlugs} currentRecipeSlug={slug} handleSaveRecipe={handleSaveRecipe} /> : <SignInAndSave recipeSlug={slug} />}
            <ChakraCustomButton bg="#285E61" color="#fff" onClick={() => router.push("/")}>Search New Recipe</ChakraCustomButton>
        </Flex>
    )
}

export default RecipeDetails;