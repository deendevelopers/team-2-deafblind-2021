import { Text, Box } from "@chakra-ui/react";
import React from "react";
import { useHistory } from "react-router";
import ChakraCustomButton from "../chakra-custom-button/ChakraCustomButton";
import CustomButton from "../custom-button/CustomButton";
// import "./SaveRecipeButton.scss";

const SaveRecipeButton = ({ handleSaveRecipe, savedRecipesIds, currentRecipeId }) => {
    const history = useHistory();
    const showButton = !savedRecipesIds.includes(currentRecipeId);

    return (
            showButton ? <ChakraCustomButton id="save-recipe-button" onClick={handleSaveRecipe}>Save Recipe</ChakraCustomButton>
                :
            (<aside className="save-recipe-button-container">
                <Text fontSize={"md"} textAlign={"center"}>This recipe has been saved - please go to your dashboard to view</Text>
                <ChakraCustomButton onClick={() => history.push("/dashboard")}>Dashboard</ChakraCustomButton>
            </aside>)
    )
}

export default SaveRecipeButton;