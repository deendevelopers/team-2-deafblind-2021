import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchForRecipes } from "../../redux/recipes/recipesActions";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Center,
} from "@chakra-ui/react";
import AdvancedSearch from "../advanced-search/AdvancedSearch";


const RecipeSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dietTerm, setDietTerm] = useState("");
  const [allergiesTerm, setAllergiesTerm] = useState("");
  const [mealTypesTerm, setMealTypesTerm] = useState("");

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = () => {
    console.log(searchTerm);
    dispatch(
      searchForRecipes({
        searchQuery: searchTerm,
        dietTerm,
        allergiesTerm,
        mealTypesTerm,
      })
    );
  };


  return (
    <React.Fragment>
      <InputGroup mt={4} bg="#fffgit">
        <Input
          size="lg"
          type="text"
          bg="#fff"
          placeholder="Find a recipe"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
      </InputGroup>
      {!showAdvancedSearch && (
        <Center my={3}>
          <Button onClick={() => setShowAdvancedSearch(true)}>
            Advanced Search
          </Button>
        </Center>
      )}
      {showAdvancedSearch && <AdvancedSearch dietTerm={dietTerm} allergiesTerm={allergiesTerm} mealTypesTerm={mealTypesTerm} setDietTerm={setDietTerm} setAllergiesTerm={setAllergiesTerm} setMealTypesTerm={setMealTypesTerm} setShowAdvancedSearch={setShowAdvancedSearch} /> }
    </React.Fragment>
  );
};

export default RecipeSearch;
