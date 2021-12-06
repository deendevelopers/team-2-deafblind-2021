import React from "react";
import Header from "../../components/header/Header";
import { Box, Flex } from "@chakra-ui/layout";

import "./HomePage.scss";
import RecipeSearchPage from "../recipe-search/RecipeSearchPage";
import RecipeSearch from "../../components/recipe-search/RecipeSearch";
import RandomChoicesSearch from "../../components/random-search/random-choices-search/RandomChoicesSearch";

const HomePage = ({ history }) => (
  <>
    <Flex direction="column" bg="green.100">
      <Box p={4} w="100%">
        <Header
          title="Search it, dish it, plate it"
          message="Everyone needs a Recipe Mate"
        />
        <Box>
          <RecipeSearch />
        </Box>
      </Box>
    </Flex>
    <RandomChoicesSearch />
    <Box bg="#fff" p={4}>
      <RecipeSearchPage />
    </Box>
  </>
);

export default HomePage;
