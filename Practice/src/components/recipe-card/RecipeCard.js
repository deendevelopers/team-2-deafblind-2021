import React from "react";
import { useHistory } from "react-router";
import { deleteRecipeIdToUserSavedRecipesIds } from "../../redux/user/userActions";
import CustomButton from "../custom-button/CustomButton";
import "./RecipeCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRecipeWithId } from "../../redux/recipes/recipesActions";

const RecipeCard = ({ recipe, isDashboard }) => {
    const { id, title, image, vegetarian, vegan, glutenFree, dairyFree } = recipe;
    const history = useHistory();
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const dietInfo = {
        vegetarian: vegetarian ? "Yes": "No",
        vegan: vegan ? "Yes": "No",
        glutenFree: glutenFree ? "Yes": "No",
        dairyFree: dairyFree ? "Yes": "No"
    }
    
    const handleDelete = () => {
        console.log({ recipeIdToDelete: id });
        dispatch(deleteRecipeIdToUserSavedRecipesIds({ userId: currentUser.id, recipeId: id }));
    }

    const handleMoreDetailsClick = () =>{
        dispatch(setCurrentRecipeWithId(id))
        history.push(`/recipes/${id}`)
    }

    return (
        <article className="recipe-card-article">
            <h3>{title}</h3>
            <img src={image} alt={`${title} Dish`}/>
            <ul>
                {Object.keys(dietInfo).map(dietMetric => <li key={dietMetric}>{dietMetric}: {dietInfo[dietMetric]}</li>)}
            </ul>
            <div className="button-container">
                <CustomButton onClick={handleMoreDetailsClick}>More Details</CustomButton>
                { isDashboard && <CustomButton onClick={handleDelete} style={{ backgroundColor: "red" }}>Delete</CustomButton>}
            </div>
        </article>
    )
}

export default RecipeCard;