import React, { useState } from "react";

const diets = ["halal", "vegetarian", "vegan", "glutenFree", "dairyFree"];
const dietMetric = ["false", "true"];

const AddRecipePage = () => {
    const [ recipeDetails, setRecipeDetails ] = useState({
        title: "",
        summary: "",
        cookingTime: "",
        halal: "false",
        vegetarian: "false",
        vegan: "false",
        glutenFree: "false",
        diaryFree: "false"
    });

    const handleChange = ({ target: { name, value } }) => {
        setRecipeDetails(exisitingDetails => ({
            ...exisitingDetails,
            [name]: value
        }))
    }

    const dietsRadios = diets.map(diet => (
            <fieldset key={diet}>
                <legend>{diet}</legend>
                { dietMetric.map((metric) => (
                    <React.Fragment>
                        <label htmlFor={metric}>{metric}</label>
                        <input key={String(metric)} id={metric} type="radio" value={metric} name={diet} onChange={handleChange} checked={recipeDetails[diet] === metric}/>
                    </React.Fragment>
                    ))
                }
            </fieldset>
        )
    )


    return (
        <form>

            <label htmlFor="title">Title: </label>
            <input name="title" id="title" type="text" value={recipeDetails.title} onChange={handleChange}/>

            <label htmlFor="summary">Summary: </label>
            <textarea name="summary" id="summary" type="text" value={recipeDetails.summary} onChange={handleChange}/>

            <label htmlFor="cookingTime">Cooking Time: </label>
            <input name="cookingTime" id="cookingTime" type="text" value={recipeDetails.cookingTime} onChange={handleChange}/>


            <fieldset>
                <legend>Diets</legend>
                {dietsRadios}
            </fieldset>

        </form>
    )
}

export default AddRecipePage;