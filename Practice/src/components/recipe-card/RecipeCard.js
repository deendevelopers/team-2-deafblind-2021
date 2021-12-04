import React from "react";
import { useHistory } from "react-router";
import CustomButton from "../custom-button/CustomButton";
import "./RecipeCard.scss";

const RecipeCard = ({ id, title, imageUrl, vegetarian, vegan, glutenFree, dairyFree }) => {
    const history = useHistory();
    const dietInfo = {
        vegetarian: vegetarian ? "Yes": "No",
        vegan: vegan ? "Yes": "No",
        glutenFree: glutenFree ? "Yes": "No",
        dairyFree: dairyFree ? "Yes": "No"
    }
    return (
        <article className="recipe-card-article">
            <h3>{title}</h3>
            <img src={imageUrl} alt={`${title} Dish`}/>
            <ul>
                {Object.keys(dietInfo).map(dietMetric => <li key={dietMetric}>{dietMetric}: {dietInfo[dietMetric]}</li>)}
            </ul>
            <CustomButton onClick={() => history.push(`/recipes/${id}`)}>More Details</CustomButton>
        </article>
    )
}

export default RecipeCard;