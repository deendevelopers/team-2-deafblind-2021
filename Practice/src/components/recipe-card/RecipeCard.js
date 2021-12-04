import React from "react";
import { useHistory } from "react-router";
import { deleteRecipeIdToUserSavedRecipesIds } from "../../redux/user/userActions";
import CustomButton from "../custom-button/CustomButton";
import "./RecipeCard.scss";
import { useDispatch, useSelector } from "react-redux";

const RecipeCard = ({ id, title, imageUrl, vegetarian, vegan, glutenFree, dairyFree }) => {
    const history = useHistory();
    const currentUserId = useSelector(state => state.user.currentUser.id);
    const dispatch = useDispatch();

    const dietInfo = {
        vegetarian: vegetarian ? "Yes": "No",
        vegan: vegan ? "Yes": "No",
        glutenFree: glutenFree ? "Yes": "No",
        dairyFree: dairyFree ? "Yes": "No"
    }
    
    const handleDelete = () => {
        console.log({ recipeIdToDelete: id });
        dispatch(deleteRecipeIdToUserSavedRecipesIds({ userId: currentUserId, recipeId: id }));
    }

    return (
        <article className="recipe-card-article">
            <h3>{title}</h3>
            <img src={imageUrl} alt={`${title} Dish`}/>
            <ul>
                {Object.keys(dietInfo).map(dietMetric => <li key={dietMetric}>{dietMetric}: {dietInfo[dietMetric]}</li>)}
            </ul>
            <div className="button-container">
                <CustomButton onClick={() => history.push(`/recipes/${id}`)}>More Details</CustomButton>
                <CustomButton onClick={handleDelete} style={{ backgroundColor: "red" }}>Delete</CustomButton>
            </div>
        </article>
    )
}

export default RecipeCard;