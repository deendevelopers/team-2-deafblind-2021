import { useSelector } from "react-redux";
import RecipeCard from "./RecipeCard";
import { Heading, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const SearchResults = () => {
    const { searchResults, startSearch } = useSelector(state => state.recipes);
    return (
      <Box as="section">
        {startSearch && <Heading as="h3" textAlign="center" fontSize={"2xl"}>Search Results</Heading>}
        {searchResults.length>0 ? (
          <React.Fragment>
            <Flex direction={{ base: 'column', md: 'row' }} flexWrap={"wrap"} justifyContent={"space-evenly"}>
              {searchResults.map((recipe) => (
                <RecipeCard key={recipe.sys.id} recipe={recipe} />
              ))}
            </Flex>
          </React.Fragment>
        ) :
            startSearch && <Text textAlign="center">No recipes match your search - Please try again with another search</Text>
        }
      </Box>
  );
};

export default SearchResults;