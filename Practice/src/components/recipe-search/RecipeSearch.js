import React, { useState } from "react";

import "./RecipeSearch.scss";
import { useDispatch } from "react-redux";
import { searchForRecipes } from "../../redux/recipes/recipesActions";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Center,
} from "@chakra-ui/react";

const diets = [
  "vegetarian",
  "vegan",
  "gluten free",
  "ketogenic",
  "pescetarian",
];
const allergies = ["dairy", "shellfish", "peanut"];
const mealTypes = [
  "main course",
  "dessert",
  "appetizer",
  "salad",
  "breakfast",
  "soup",
  "snack",
];

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
      {showAdvancedSearch && (
        <div>
          <form>
            <fieldset>
              <legend>Diet</legend>
              {diets.map((diet) => (
                <label key={diet} htmlFor={diet}>
                  {diet}
                  <input
                    id={diet}
                    type="checkbox"
                    name={diet}
                    value={diet}
                    checked={dietTerm === diet}
                    onChange={() => setDietTerm(diet)}
                  />
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Allergies</legend>
              {allergies.map((allergy) => (
                <label key={allergy} htmlFor={allergy}>
                  {allergy}
                  <input
                    id={allergy}
                    type="checkbox"
                    name={allergy}
                    value={allergy}
                    checked={allergiesTerm === allergy}
                    onChange={() => setAllergiesTerm(allergy)}
                  />
                </label>
              ))}
            </fieldset>
            <fieldset>
              <legend>Meal Types</legend>
              {mealTypes.map((mealType) => (
                <label key={mealType} htmlFor={mealType}>
                  {mealType}
                  <input
                    id={mealType}
                    type="checkbox"
                    name={mealType}
                    value={mealType}
                    checked={mealTypesTerm === mealType}
                    onChange={() => setMealTypesTerm(mealType)}
                  />
                </label>
              ))}
            </fieldset>
          </form>
          <button onClick={() => setShowAdvancedSearch(false)}>
            Back to top ^
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export default RecipeSearch;
