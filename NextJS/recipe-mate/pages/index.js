import Head from "next/head"
import { createClient } from "contentful"
import { Box, Flex, Heading, Center, Text } from "@chakra-ui/react";
import RecipeSearch from "../components/recipe-search/RecipeSearch";
import { useDispatch, useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";
import SelectChoicesSearch from "../components/select-choices-search/SelectChoicesSearch";
import { useEffect } from "react";
import { resetSearch } from "../redux/recipes/recipesActions";

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

export default function Home({ recipes }) {
  console.log(recipes);
  const { searchResults, startSearch } = useSelector(state => state.recipes);
  console.log(searchResults);
  const dispatch = useDispatch();

  // reset redux state tracking whether search started when component mounts
  useEffect(() => {
    dispatch(resetSearch());
  }, [])

  return (
    <div >
      <Head>
        <title>Recipe Mate</title>
        <meta name="description" content="Search it, dish it, plate it - Everyone needs a Recipe Mate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex direction="column" bg="green.100" mb={4}>
          <Box p={4} w="100%" >
            <Heading as="h1" size="xl" color="#111">Search it, dish it, plate it</ Heading>
            <Heading as="h2" size="md" fontWeight="normal" color="#111">Everyone needs a Recipe Mate</ Heading>
            <RecipeSearch recipes={recipes} />
          </Box>
        </Flex>
        <SelectChoicesSearch recipes={recipes} />
        <Center p={4} >
          { searchResults.length>0 ? searchResults.map((recipe) => <RecipeCard key={recipe.sys.id} recipe={recipe} />) : startSearch && <Text>No recipes match your search - Please try again with another search</Text>}
        </Center >
      </main>
    </div>
  )
}
