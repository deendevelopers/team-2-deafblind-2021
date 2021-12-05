import React from "react";
import Header from "../../components/header/Header";
import { Box, Flex } from "@chakra-ui/layout";

import "./HomePage.scss";
import RandomRecipePage from "../random-recipe/RandomRecipePage";
import RecipeSearchPage from "../recipe-search/RecipeSearchPage";

const HomePage = ({ history }) => (
  <Box p={4} w="100%" bg="green.100">
    <Flex direction="column">
      <Header
        title="Search it, dish it, plate it"
        message="Everyone needs a Recipe Mate"
      />

      <RecipeSearchPage />
      {/* <section className="homepage-section">
      <h2>
        Click here to go to be a bit adventurous and search for a random recipe!
      </h2>
      <RandomRecipePage />
    </section> */}
    </Flex>
  </Box>
);

export default HomePage;
