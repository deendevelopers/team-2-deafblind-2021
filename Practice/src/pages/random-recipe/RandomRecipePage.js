import React, { useState } from "react";
import CustomButton from "../../components/custom-button/CustomButton";
import Header from "../../components/header/Header";
import SelectionForm from "../../components/random-search/selection-form/SelectionForm";
import RecipeArticle from "../../components/recipe-article/RecipeArticle";
import data from "../../response.json";
import "./RandomRecipePage.scss";
import {fetchRandomRecipe, generateCustomEndPoint } from "../../components/random-search/helperFunctions";
import { useDispatch, useSelector } from "react-redux";
import { addRecipeToUserSavedRecipes } from "../../redux/user/userActions";
import { setCurrentRecipe } from "../../redux/recipes/recipesActions";

const RandomRecipePage = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const currentRecipe = useSelector(state => state.recipes.currentRecipe);
    const dispatch = useDispatch();

    const [ searchAgain, setSearchAgain ] = useState(false);
    const [ customRandomSearch, setCustomRandomSearch ] = useState({});
    const [ noResults, setNoResults ] = useState(false);

    const handleClick = async () => {
        const randomRecipeData = await fetchRandomRecipe({ isCustomSearch: false });
        // const randomRecipeData = data.recipes[0];
        console.log(randomRecipeData);
        dispatch(setCurrentRecipe(randomRecipeData));
        setSearchAgain(true);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomRandomSearch(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleCustomSearch = async (e) => {
        e.preventDefault();
        const customEndPoint = generateCustomEndPoint(customRandomSearch);
        // const randomRecipeData = await fetchRandomRecipe({ isCustomSearch: true, customEndPoint });
        // console.log(randomRecipeData);
        const randomRecipeData = data.recipes[0];
        if(randomRecipeData){
            dispatch(setCurrentRecipe(randomRecipeData));
            setNoResults(false);
        } else{
            setNoResults(true);
        } ;
        setCustomRandomSearch([]);
        setSearchAgain(true);
    }

    const handleSaveRecipe = () => {
        console.log("Handle Save Recipe")
        const { id } = currentRecipe;
        // Save/add recipe to redux recipe slice 

        // Save/add recipe ID to redux saved recipes array in current user slice
        dispatch(addRecipeToUserSavedRecipes({ userId: currentUser.id, recipeId: id }));

    }

    return (
        <React.Fragment>
            <Header title="You are on the Random Recipe generator page" message="Here you can generate a random recipe and have a fun adventure cooking it!" />
            <main>
                { !searchAgain ?
                    <React.Fragment>
                        <CustomButton onClick={handleClick}>Find Random Recipe</CustomButton>
                        <p className="custom-random-search-message">Customise your random recipe by chosing from the options below:</p>
                        <SelectionForm handleChange={handleChange} handleSubmit={handleCustomSearch}/>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <CustomButton onClick={() => setSearchAgain(false)}>Search Again</CustomButton>
                        { noResults && <p>No results found to your custom search - please try a different custom search.</p> }
                        <RecipeArticle currentRecipe={currentRecipe} />                        
                        { currentUser && <CustomButton id="save-recipe-button" onClick={handleSaveRecipe}>Save Recipe</CustomButton> }
                    </React.Fragment>
                }
            </main>
        </React.Fragment>
    )
}

export default RandomRecipePage;