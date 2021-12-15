import Head from "next/head"
import { createClient } from "contentful"
import { Box, Flex, Heading, Center} from "@chakra-ui/react";
import RecipeSearch from "../components/recipe-search/RecipeSearch";
import { useDispatch } from "react-redux";
import SelectChoicesSearch from "../components/select-choices-search/SelectChoicesSearch";
import { useEffect } from "react";
import { resetSearch } from "../redux/recipes/recipesActions";
import SearchResults from "../components/SearchResults";

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
  const dispatch = useDispatch();

  // reset redux state tracking whether search started when component mounts
  useEffect(() => {
    dispatch(resetSearch());
  }, [dispatch])

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
        {/* <Center p={4} >*/}
        <SearchResults />
        {/*</Center > */}
      </main>
    </div>
  )
}
