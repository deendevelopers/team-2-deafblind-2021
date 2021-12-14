import ChakraCustomButton from "../ChakraCustomButton";
import { Box } from '@chakra-ui/react';
import { ArrowUpIcon } from "@chakra-ui/icons";
import CheckBoxInputs from "./CheckBoxInputs";

const diets = ["vegetarian", "vegan", "gluten free", "ketogenic", "pescetarian",];
const allergies = ["dairy", "shellfish", "peanut",];
const mealTypes = [ "main course", "dessert", "appetizer", "salad", "breakfast", "soup", "snack",];

const AdvancedSearch = ({ dietTerm, allergiesTerm, mealTypesTerm, handleAdvancedSearchChange, setShowAdvancedSearch }) => {
    return (
        <Box bg="white" marginTop={2} p={3}>
            <form>
                <CheckBoxInputs name="dietTerm" handleChange={handleAdvancedSearchChange} groupLabelState={dietTerm} groupLabel="Diet" checkBoxLabels={diets} />

                <CheckBoxInputs name="allergiesTerm" handleChange={handleAdvancedSearchChange} groupLabelState={allergiesTerm} groupLabel="Allergies" checkBoxLabels={allergies} />

                <CheckBoxInputs name="mealTypesTerm" handleChange={handleAdvancedSearchChange} groupLabelState={mealTypesTerm} groupLabel="Meal Types" checkBoxLabels={mealTypes} />
            </form>
            <ChakraCustomButton onClick={() => setShowAdvancedSearch(false)}>
                Back to top <ArrowUpIcon marginLeft={2} border="2px" borderRadius={50} name="arrow-up" />
            </ChakraCustomButton>
        </Box>
    )
}

export default AdvancedSearch;