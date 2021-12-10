import React from "react";
import ChakraCustomButton from "../chakra-custom-button/ChakraCustomButton";
import { Box } from '@chakra-ui/react';
import { ArrowUpIcon } from "@chakra-ui/icons";
import RadioInputs from "./RadioInputs";

const diets = ["vegetarian", "vegan", "gluten free", "ketogenic", "pescetarian",];
const allergies = ["dairy", "shellfish", "peanut",];
const mealTypes = [ "main course", "dessert", "appetizer", "salad", "breakfast", "soup", "snack",];

const AdvancedSearch = ({ dietTerm, allergiesTerm, mealTypesTerm, setDietTerm, setAllergiesTerm, setMealTypesTerm, setShowAdvancedSearch }) => (
    <Box bg="white" marginTop={2} p={3}>
        <form>
            <RadioInputs setter={setDietTerm} groupLabelState={dietTerm} groupLabel="Diet" radioLabels={diets} />

            <RadioInputs setter={setAllergiesTerm} groupLabelState={allergiesTerm} groupLabel="Allergies" radioLabels={allergies} />

            <RadioInputs setter={setMealTypesTerm} groupLabelState={mealTypesTerm} groupLabel="Meal Types" radioLabels={mealTypes} />
        </form>
        <ChakraCustomButton onClick={() => setShowAdvancedSearch(false)}>
            Back to top <ArrowUpIcon marginLeft={2} border="2px" borderRadius={50} name="arrow-up" />
        </ChakraCustomButton>
    </Box>
)

export default AdvancedSearch;