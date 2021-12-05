import React, { useState } from "react";

import "./RecipeSearch.scss";
import { useDispatch } from "react-redux";
import { searchForRecipes } from "../../redux/recipes/recipesActions";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  const handleSearch = () => {
    console.log(searchTerm);
    dispatch(searchForRecipes(searchTerm));
  };

  return (
    <InputGroup mt={4} bg="#fffgit">
      <Input
        size="lg"
        placeholder="Find a Recipe"
        value={searchTerm}
        bg="#fff"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {/* <input id="recipe-search-input" type="text" name="recipe-search" placeholder="Click here to search for a recipe of your liking"  /> */}
      <InputRightElement width="4.5rem" h="100%">
        <Button
          size="lg"
          borderLeftRadius="0"
          bg="#285E61"
          color="#fff"
          h="100%"
          onClick={handleSearch}
          _active={{
            bg: "teal.700",
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
          }}
          _hover={{
            bg: "teal.600",
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
          }}
        >
          Search
        </Button>
      </InputRightElement>
      {/* <CustomButton onClick={handleSearch}>Search Recipe</CustomButton> */}
    </InputGroup>
  );
};

export default RecipeSearch;
