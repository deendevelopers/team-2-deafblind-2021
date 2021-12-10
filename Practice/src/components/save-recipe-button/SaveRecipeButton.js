import React from "react";
import { useHistory } from "react-router";
import ChakraCustomButton from "../chakra-custom-button/ChakraCustomButton";
import { CheckIcon } from '@chakra-ui/icons'
import { Flex, Text } from "@chakra-ui/react";
const SaveRecipeButton = ({ handleSaveRecipe, savedRecipesIds, currentRecipeId, isCard }) => {
    const history = useHistory();
    const showButton = !savedRecipesIds.includes(currentRecipeId);

    return (
        showButton ? <ChakraCustomButton id="save-recipe-button" onClick={handleSaveRecipe}>Save Recipe</ChakraCustomButton>
            :
        (isCard ? <Flex alignItems="center"><CheckIcon color="green" /><Text color="green">Already saved</Text></Flex>
            : (
            <aside className="save-recipe-button-container">
                <Text fontSize={"md"} textAlign={"center"}>This recipe has been saved - please go to your dashboard to view</Text>
                <ChakraCustomButton onClick={() => history.push("/dashboard")}>Dashboard</ChakraCustomButton>
            </aside>
            )
        )
    )
}

export default SaveRecipeButton;