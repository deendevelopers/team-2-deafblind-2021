import React from "react";
import { useHistory } from "react-router";
import CustomButton from "../custom-button/CustomButton";
import "./SaveRecipeButton.scss";

const SaveRecipeButton = ({ handleSaveRecipe, savedRecipesIds, currentRecipeId }) => {
    const history = useHistory();
    const showButton = !savedRecipesIds.includes(currentRecipeId);

    return (
            showButton ? <CustomButton id="save-recipe-button" onClick={handleSaveRecipe}>Save Recipe</CustomButton>
                :
            (<aside className="save-recipe-button-container">
                <p>This recipe has been saved - please go to your dashboard to view</p>
                <CustomButton onClick={() => history.push("/dashboard")}>Dashboard</CustomButton>
            </aside>)
    )
}

export default SaveRecipeButton;