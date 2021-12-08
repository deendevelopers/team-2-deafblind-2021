import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setCurrentRecipe } from "../../../redux/recipes/recipesActions";
import CustomButton from "../../custom-button/CustomButton";
import { fetchRandomChoicesRecipes } from "../helperFunctions";
import { Grid, GridItem, Center, Box, Button, Image } from '@chakra-ui/react'
import RandomChoiceButtonContainer from "./RandomChoiceButtonContainer";

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
        <Grid templateColumns='repeat(3, 1fr)' gap={1} marginTop={5}>

            <RandomChoiceButtonContainer 
                name={"indian"} title={"Indian"} boxBg={"orange.200"} handleClick={handleClick}
                imageUrl={`/assets/random-choices-images/IndianCuisineOption.svg`} 
                imageAlt={"Cartoon like illustrations of kebabs on skewers."}
            />
            <RandomChoiceButtonContainer 
                name={"salad"} title={"Salad"} boxBg={"yellow.300"} handleClick={handleClick}
                imageUrl={`/assets/random-choices-images/SaladOption.svg`} 
                imageAlt={"Cartoon like illustrations of a salad consisting of a variety of greens in a bowl."}
            />
            <RandomChoiceButtonContainer 
                name={"dessert"} title={"Sweet"} boxBg={"orange.200"} handleClick={handleClick}
                imageUrl={`/assets/random-choices-images/SweetOption.svg`} 
                imageAlt={"Cartoon like illustrations of a chocolate cake with a cherry on top."}
            />
            <RandomChoiceButtonContainer 
                name={"easy"} title={"Easy"} boxBg={"yellow.300"} handleClick={handleClick}
                imageUrl={`/assets/random-choices-images/BurgerEasyOption.svg`} 
                imageAlt={"Cartoon like illustrations of a cheeseburger with some lettuce sandwiched between the patties."}
            />
            <RandomChoiceButtonContainer 
                name={"oven"} title={"Oven"} boxBg={"orange.200"} handleClick={handleClick}
                imageUrl={`/assets/random-choices-images/PizzaOvenOption.svg`} 
                imageAlt={"Cartoon like illustrations of a pizza slice."}
            />
            <RandomChoiceButtonContainer 
                name={"vegetarian"} title={"Veggie"} boxBg={"yellow.300"} handleClick={handleClick}
                imageUrl={`/assets/random-choices-images/VeggieOption.svg`} 
                imageAlt={"Cartoon like illustrations of two sushi pieces."}
            />
            { noRecipeFound && <p>No recipe found - please try again</p> }
        </Grid>
    )
}

export default RandomChoicesSearch;