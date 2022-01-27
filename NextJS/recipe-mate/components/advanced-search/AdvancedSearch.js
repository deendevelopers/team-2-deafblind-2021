import ChakraCustomButton from "../ChakraCustomButton";
import { Box, Flex } from '@chakra-ui/react';
import { ArrowUpIcon } from "@chakra-ui/icons";
import CheckBoxInputs from "./CheckBoxInputs";

const diets = ["halal", "kosher", "vegetarian", "vegan", "gluten free", "ketogenic", "pescatarian",];
const allergies = ["dairy", "shellfish", "nuts",];
const mealTypes = [ "lunch", "dessert", "appetiser", "salad", "breakfast", "dinner", "snack",];

const AdvancedSearch = ({ dietTerm, allergiesTerm, mealTypesTerm, handleAdvancedSearchChange, setShowAdvancedSearch }) => {
    return (
        <Box bg="white" marginTop={2} p={3}>
            <Flex as="form" direction={{ base: "column", md: "row" }} justifyContent="space-evenly" alignItems={{base: "center", md: "flex-start"}} mb={5}>
                <CheckBoxInputs name="dietTerm" handleChange={handleAdvancedSearchChange} groupLabelState={dietTerm} groupLabel="Diet" checkBoxLabels={diets} />

                <CheckBoxInputs name="allergiesTerm" handleChange={handleAdvancedSearchChange} groupLabelState={allergiesTerm} groupLabel="Allergies" checkBoxLabels={allergies} />

                <CheckBoxInputs name="mealTypesTerm" handleChange={handleAdvancedSearchChange} groupLabelState={mealTypesTerm} groupLabel="Meal Types" checkBoxLabels={mealTypes} />
            </Flex>
            <ChakraCustomButton onClick={() => setShowAdvancedSearch(false)}>
                Back to top <ArrowUpIcon marginLeft={2} border="2px" borderRadius={50} name="arrow-up" />
            </ChakraCustomButton>
        </Box>
    )
}

export default AdvancedSearch;