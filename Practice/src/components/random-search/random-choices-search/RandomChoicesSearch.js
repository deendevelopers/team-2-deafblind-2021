import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setCurrentRecipe } from "../../../redux/recipes/recipesActions";
import CustomButton from "../../custom-button/CustomButton";
import { fetchRandomChoicesRecipes } from "../helperFunctions";

const RandomChoicesSearch = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [ noRecipeFound, setNoRecipeFound ] = useState(false)

    const handleClick = async ({ target: { name } }) => {
        const randomRecipeData = await fetchRandomChoicesRecipes({ choice: name });
        console.log(randomRecipeData)
        if(randomRecipeData){
            dispatch(setCurrentRecipe(randomRecipeData));
            history.push("/recipes/"+randomRecipeData.id);
            setNoRecipeFound(false)
        } else{
            setNoRecipeFound(true)
        }
    }

    return (
        <div className="button-choices-container">
            <CustomButton name="indian" onClick={handleClick}>Indian</CustomButton>
            <CustomButton name="salad" onClick={handleClick}>Salad</CustomButton>
            <CustomButton name="dessert" onClick={handleClick}>Sweet</CustomButton>
            <CustomButton name="easy" onClick={handleClick}>Easy</CustomButton>
            <CustomButton name="oven" onClick={handleClick}>Oven</CustomButton>
            <CustomButton name="vegetarian" onClick={handleClick}>Veggie</CustomButton>
            { noRecipeFound && <p>No recipe found - please try again</p> }
        </div>
    )
}

export default RandomChoicesSearch;