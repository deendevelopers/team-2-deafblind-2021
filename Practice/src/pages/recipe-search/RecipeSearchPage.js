import React from "react";
// import RecipeSearch from "../../components/recipe-search/RecipeSearch";
import "./RecipeSearchPage.scss";
import { useSelector } from "react-redux";
import RecipeCard from "../../components/recipe-card/RecipeCard";
import { Heading, Box } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";

const RecipeSearchPage = () => {
  const searchResults = useSelector((state) => state.recipes.searchResults);
  return (
    <>
      {/* <Box bg="green.100">
        <RecipeSearch />
      </Box> */}
      
      <section>
        {searchResults.length !== 0 && (
          <Box>
            <Heading as="h3" textAlign="center" fontSize={"2xl"}>Search Results</Heading>
            <Flex direction="column">
              {searchResults.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </Flex>
          </Box>
        )}
      </section>
    </>
  );
};

export default RecipeSearchPage;
