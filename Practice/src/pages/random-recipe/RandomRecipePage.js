import React, { useState } from "react";
import SelectionForm from "../../components/random-search/selection-form/SelectionForm";
import data from "../../response.json";
import "./RandomRecipePage.scss";
import {fetchRandomRecipe, generateCustomEndPoint } from "../../components/random-search/helperFunctions";
import { useDispatch } from "react-redux";
import { setCurrentRecipe } from "../../redux/recipes/recipesActions";
import { useHistory } from "react-router";
import RandomChoicesSearch from "../../components/random-search/random-choices-search/RandomChoicesSearch";

const RandomRecipePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [ customRandomSearch, setCustomRandomSearch ] = useState({});

    const handleClick = async () => {

        const randomRecipeData = await fetchRandomRecipe({ isCustomSearch: false });
        // const randomRecipeData = data.recipes[0];
        // console.log(randomRecipeData.analyzedInstructions);
        dispatch(setCurrentRecipe(randomRecipeData));
        history.push("/recipes/"+randomRecipeData.id);
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
        const randomRecipeData = await fetchRandomRecipe({ isCustomSearch: true, customEndPoint });
        console.log(randomRecipeData);
        // const randomRecipeData = data.recipes[0];
        if(randomRecipeData){
            dispatch(setCurrentRecipe(randomRecipeData));
            history.push("/recipes/"+randomRecipeData.id);
        } 
        setCustomRandomSearch([]);
    }

    return (
        <main>
            <React.Fragment>
                <RandomChoicesSearch />
                <p className="custom-random-search-message">Customise your random recipe by chosing from the options below:</p>
                <SelectionForm handleChange={handleChange} handleSubmit={handleCustomSearch}/>
            </React.Fragment>
        </main>
    )
}

export default RandomRecipePage;