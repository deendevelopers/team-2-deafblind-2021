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
    <InputGroup mt={4}>
      <Input
        size="lg"
        placeholder="Find a Recipe"
        value={searchTerm}
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
        >
          Search
        </Button>
      </InputRightElement>
      {/* <CustomButton onClick={handleSearch}>Search Recipe</CustomButton> */}
    </InputGroup>
  );
};

export default RecipeSearch;
