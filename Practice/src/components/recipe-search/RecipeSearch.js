import React, { useState } from "react";
import CustomButton from "../custom-button/CustomButton";
import "./RecipeSearch.scss";
import { useDispatch } from "react-redux";
import { searchForRecipes } from "../../redux/recipes/recipesActions";

const diets = ["vegetarian", "vegan", "gluten free", "ketogenic", "pescetarian"];
const allergies = ["dairy", "shellfish", "peanut"];
const mealTypes = ["main course", "dessert", "appetizer", "salad", "breakfast", "soup", "snack"];

const RecipeSearch = () => {

    const [ searchTerm, setSearchTerm ] = useState("");
    const [ dietTerm, setDietTerm ] = useState("");
    const [ allergiesTerm, setAllergiesTerm ] = useState("");
    const [ mealTypesTerm, setMealTypesTerm ] = useState("");

    const [ showAdvancedSearch, setShowAdvancedSearch ] = useState(false);
    const dispatch = useDispatch();

    const handleSearch = () => {
        console.log(searchTerm);
        dispatch(searchForRecipes({ searchQuery: searchTerm, dietTerm, allergiesTerm, mealTypesTerm }))


    }

    return (
        <React.Fragment>
            <input id="recipe-search-input" type="text" name="recipe-search" placeholder="Click here to search for a recipe of your liking" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <CustomButton onClick={handleSearch}>Search Recipe</ CustomButton>
            { !showAdvancedSearch && <CustomButton onClick={() => setShowAdvancedSearch(true)}>Advanced Search</CustomButton>}
            {showAdvancedSearch && (
                <div>
                    <form>
                        <fieldset>
                            <legend>Diet</legend>
                            {diets.map(diet => (
                                    <label key={diet} htmlFor={diet}>{diet}
                                        <input id={diet} type="checkbox" name={diet} value={diet} checked={dietTerm === diet} onChange={() => setDietTerm(diet)}/>
                                    </label>
                                )
                            )}
                        </fieldset>
                        <fieldset>
                            <legend>Allergies</legend>
                            {allergies.map(allergy => (
                                    <label key={allergy} htmlFor={allergy}>{allergy}
                                        <input id={allergy} type="checkbox" name={allergy} value={allergy} checked={allergiesTerm === allergy} onChange={() => setAllergiesTerm(allergy)}/>
                                    </label>
                                )
                            )}
                        </fieldset>
                        <fieldset>
                            <legend>Meal Types</legend>
                            {mealTypes.map(mealType => (
                                    <label key={mealType} htmlFor={mealType}>{mealType}
                                        <input id={mealType} type="checkbox" name={mealType} value={mealType} checked={mealTypesTerm === mealType} onChange={() => setMealTypesTerm(mealType)}/>
                                    </label>
                                )
                            )}
                        </fieldset>
                    </form>
                    <button onClick={() => setShowAdvancedSearch(false)}>Back to top ^</button>
                </div>
            )
            }
            
        </React.Fragment>
    )
}

export default RecipeSearch;