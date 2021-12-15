import ChakraCustomButton from "./ChakraCustomButton";

const SaveRecipeButton = ({ handleSaveRecipe }) => {

    return (
    <ChakraCustomButton id="save-recipe-button" onClick={handleSaveRecipe}>Save Recipe</ChakraCustomButton>
    )
}

export default SaveRecipeButton;