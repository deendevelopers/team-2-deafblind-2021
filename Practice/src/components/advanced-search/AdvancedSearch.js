import React from "react";
import ChakraCustomButton from "../chakra-custom-button/ChakraCustomButton";
import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio
  } from '@chakra-ui/react';
import { ArrowUpIcon } from "@chakra-ui/icons";

const diets = ["vegetarian", "vegan", "gluten free", "ketogenic", "pescetarian",];

const allergies = ["dairy", "shellfish", "peanut"];

const mealTypes = [ "main course", "dessert", "appetizer", "salad", "breakfast", "soup", "snack",];

const AdvancedSearch = ({ dietTerm, allergiesTerm, mealTypesTerm, setDietTerm, setAllergiesTerm, setMealTypesTerm, setShowAdvancedSearch }) => (
    <Box bg="white" marginTop={2} p={3}>
    <form>

        <FormControl as="fieldset">
            <FormLabel as="legend">Diet</FormLabel>
            <RadioGroup>
                <Flex direction="column">
                {diets.map((diet) => (
                    <Radio 
                        key={diet} 
                        id={diet}
                        name={diet}
                        value={diet}
                        checked={dietTerm === diet}
                        onChange={() => setDietTerm(diet)}
                    >
                        {diet}
                    </Radio>
                ))}
                </Flex>
            </RadioGroup>
        </FormControl>

        <FormControl as="fieldset">
            <FormLabel as="legend">Allergies</FormLabel>
            <RadioGroup>
                <Flex direction="column">
                {allergies.map((allergy) => (
                    <Radio 
                        key={allergy} 
                        id={allergy}
                        name={allergy}
                        value={allergy}
                        checked={allergiesTerm === allergy}
                        onChange={() => setAllergiesTerm(allergy)}
                    >
                        {allergy}
                    </Radio>
                ))}
                </Flex>
            </RadioGroup>
        </FormControl>

        <FormControl as="fieldset">
            <FormLabel as="legend">Meal Types</FormLabel>
            <RadioGroup>
                <Flex direction="column">
                {mealTypes.map((mealType) => (
                    <Radio 
                        key={mealType} 
                        id={mealType}
                        name={mealType}
                        value={mealType}
                        checked={mealTypesTerm === mealType}
                        onChange={() => setMealTypesTerm(mealType)}
                    >
                        {mealType}
                    </Radio>
                ))}
                </Flex>
            </RadioGroup>
        </FormControl>

    </form>
    <ChakraCustomButton onClick={() => setShowAdvancedSearch(false)}>
      Back to top <ArrowUpIcon marginLeft={2} border="2px" borderRadius={50} name="arrow-up" />
    </ChakraCustomButton>
  </Box>
)

export default AdvancedSearch;