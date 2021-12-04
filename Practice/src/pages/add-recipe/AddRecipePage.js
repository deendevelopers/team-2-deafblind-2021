import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomRecipeToFirebase } from "../../redux/recipes/recipesActions";

const diets = ["halal", "vegetarian", "vegan", "glutenFree", "dairyFree"];
const dietMetric = ["false", "true"];

const AddRecipePage = () => {

    const dispatch = useDispatch();

    const [ recipeDetails, setRecipeDetails ] = useState({
        title: "",
        summary: "",
        cookingTime: "",
        imageUrl: "",
        halal: "false",
        vegetarian: "false",
        vegan: "false",
        glutenFree: "false",
        dairyFree: "false",
        ingredient: "",
        instruction: ""
    });
    const [ ingredients, setIngredients ] = useState([]);
    const [ instructions, setInstructions ] = useState([]);


    const handleChange = ({ target: { name, value } }) => {
        setRecipeDetails(exisitingDetails => ({
            ...exisitingDetails,
            [name]: value
        }))
    }

    const addIngedient = (event) => {
        event.preventDefault();
        setIngredients(existingIngredients => [...existingIngredients, recipeDetails.ingredient])
        setRecipeDetails(exisitingDetails => ({ ...exisitingDetails, ingredient: "" }))
    }

    const deleteIngredient = (event, ingredientToDelete) => {
        event.preventDefault();
        setIngredients(exisitingIngredients => exisitingIngredients.filter(ingredient => ingredient !== ingredientToDelete));
    }

    const addInstruction = (event) => {
        event.preventDefault();
        setInstructions(existingInstructions => [...existingInstructions, recipeDetails.instruction])
        setRecipeDetails(exisitingDetails => ({ ...exisitingDetails, instruction: "" }))
    }

    const deleteinstruction = (event, instructionToDelete) => {
        event.preventDefault();
        setInstructions(exisitingInstructions => exisitingInstructions.filter(instruction => instruction !== instructionToDelete));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Submitted");
        
        const instructionsModified = instructions.map((step, index) => ({ step, number: index+1 }))

        const newRecipe = { 
            ...recipeDetails,
            ingredients,
            instructionsModified
        };

        // generate random unique id using timestamp 
        const id = new Date().valueOf();
        newRecipe.id = id;

        dispatch(addCustomRecipeToFirebase(newRecipe))
        
        // reset states
        setRecipeDetails({
            title: "",
            summary: "",
            cookingTime: "",
            imageUrl: "",
            halal: "false",
            vegetarian: "false",
            vegan: "false",
            glutenFree: "false",
            dairyFree: "false",
            ingredient: "",
            instruction: ""
        });
        setIngredients([]);
        setInstructions([]);
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
        <form onSubmit={handleSubmit}>

            <label htmlFor="title">Title: </label>
            <input name="title" id="title" type="text" value={recipeDetails.title} onChange={handleChange}/>

            <label htmlFor="summary">Summary: </label>
            <textarea name="summary" id="summary" type="text" value={recipeDetails.summary} onChange={handleChange}/>

            <label htmlFor="cookingTime">Cooking Time: </label>
            <input name="cookingTime" id="cookingTime" type="text" value={recipeDetails.cookingTime} onChange={handleChange}/>

            <label htmlFor="imageUrl">Image Url: </label>
            <input name="imageUrl" id="imageUrl" type="text" value={recipeDetails.imageUrl} onChange={handleChange}/>

            <fieldset>
                <legend>Diets</legend>
                {dietsRadios}
            </fieldset>

            <div className="ingredients-container">
                <label htmlFor="ingredient">ingredient: </label>
                <input name="ingredient" id="ingredient" type="text" value={recipeDetails.ingredient} onChange={handleChange} />
                <button onClick={addIngedient}>Add</button>
                <ul>
                    { ingredients.map(ingredient => {
                        return (
                            <React.Fragment>
                                <li key={ingredient}>{ingredient}</li>
                                <button onClick={(event) => deleteIngredient(event, ingredient)}>Delete</button>
                            </React.Fragment>

                        )
                        }) 
                    }
                </ul>
            </div>

            <div className="instructions-container">
                <label htmlFor="instruction">instruction: </label>
                <input name="instruction" id="instruction" type="text" value={recipeDetails.instruction} onChange={handleChange} />
                <button onClick={addInstruction}>Add</button>
                <ol>
                    { instructions.map(instruction => {
                        return (
                            <React.Fragment>
                                <li key={instruction}>{instruction}</li>
                                <button onClick={(event) => deleteinstruction(event, instruction)}>Delete</button>
                            </React.Fragment>

                        )
                        }) 
                    }
                </ol>
            </div>
            
            <input type="submit" value="Submit"/>

        </form>
    )
}

export default AddRecipePage;