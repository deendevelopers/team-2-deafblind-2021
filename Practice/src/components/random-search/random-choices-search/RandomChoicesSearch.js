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
                name={"indian"} title={"Indian"} boxBg={"orange"} handleClick={handleClick}
                imageUrl={`https://s3.us-west-2.amazonaws.com/secure.notion-static.com/5fc3e874-455e-499c-b575-0057903e9b24/The_Munchies_Plate.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211206T142302Z&X-Amz-Expires=86400&X-Amz-Signature=6bd7fe88f40e36bbb34dc70a25abec02649eb3e8627d07d6fac4c413e59cbbc9&X-Amz-SignedHeaders=host&response-content-disposition=filename %3D"The%2520Munchies%2520Plate.svg"&x-id=GetObject`} 
                imageAlt={"Cartoon like illustrations of kebabs on skewers."}
            />
            <RandomChoiceButtonContainer 
                name={"salad"} title={"Salad"} boxBg={"yellow"} handleClick={handleClick}
                imageUrl={`https://s3.us-west-2.amazonaws.com/secure.notion-static.com/2a27a42a-088c-4675-90a5-a587c296fb87/The_Munchies_Bowl_%281%29.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211206T000334Z&X-Amz-Expires=86400&X-Amz-Signature=982239697c243a5e4d53bc116a0c1c99e2cbaf6c3113c7746f90c5663b62b95c&X-Amz-SignedHeaders=host&response-content-disposition=filename %3D"The%2520Munchies%2520Bowl%2520%281%29.svg"&x-id=GetObject`} 
                imageAlt={"Cartoon like illustrations of a salad consisting of a variety of greens in a bowl."}
            />
            <RandomChoiceButtonContainer 
                name={"dessert"} title={"Sweet"} boxBg={"orange"} handleClick={handleClick}
                imageUrl={`https://s3.us-west-2.amazonaws.com/secure.notion-static.com/344943bf-6ab8-42c2-9e35-09c12655a797/The_Munchies_Desserts.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211206T000345Z&X-Amz-Expires=86400&X-Amz-Signature=f038bb122fa1c30fd4036aaeb605607cca7157b7dd9ffda212727d294e980fc2&X-Amz-SignedHeaders=host&response-content-disposition=filename %3D"The%2520Munchies%2520Desserts.svg"&x-id=GetObject`} 
                imageAlt={"Cartoon like illustrations of a chocolate cake with a cherry on top."}
            />
            <RandomChoiceButtonContainer 
                name={"easy"} title={"Easy"} boxBg={"yellow"} handleClick={handleClick}
                imageUrl={`https://s3.us-west-2.amazonaws.com/secure.notion-static.com/097447df-1984-4950-bc6f-d3185f954614/The_Munchies_Dish.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211206T142223Z&X-Amz-Expires=86400&X-Amz-Signature=523afb737c987eeda3e6a249356bbfc244e3e437ea1e3c309bdb5209a01e644c&X-Amz-SignedHeaders=host&response-content-disposition=filename %3D"The%2520Munchies%2520Dish.svg"&x-id=GetObject`} 
                imageAlt={"Cartoon like illustrations of a cheeseburger with some lettuce sandwiched between the patties."}
            />
            <RandomChoiceButtonContainer 
                name={"oven"} title={"Oven"} boxBg={"orange"} handleClick={handleClick}
                imageUrl={`https://s3.us-west-2.amazonaws.com/secure.notion-static.com/cf0bdf7f-b48a-4fe9-9611-e9200c392e1b/The_Munchies_Dish_%281%29.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211206T000341Z&X-Amz-Expires=86400&X-Amz-Signature=6a1f1265d94a577d5ca5a54c0ccac4bd324d945c819c24f805ea2206767e1ff7&X-Amz-SignedHeaders=host&response-content-disposition=filename %3D"The%2520Munchies%2520Dish%2520%281%29.svg"&x-id=GetObject`} 
                imageAlt={"Cartoon like illustrations of a pizza slice."}
            />
            <RandomChoiceButtonContainer 
                name={"vegetarian"} title={"Veggie"} boxBg={"yellow"} handleClick={handleClick}
                imageUrl={`https://s3.us-west-2.amazonaws.com/secure.notion-static.com/14e0e522-c7e9-4897-ace5-3ccdcba5a23f/The_Munchies_Dish_%282%29.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211206T142142Z&X-Amz-Expires=86400&X-Amz-Signature=cd30926101b2f9b4e4351410f036a02b6f8433fbef5485b9833b9a647f752bcc&X-Amz-SignedHeaders=host&response-content-disposition=filename %3D"The%2520Munchies%2520Dish%2520%282%29.svg"&x-id=GetObject`} 
                imageAlt={"Cartoon like illustrations of two sushi pieces."}
            />
            { noRecipeFound && <p>No recipe found - please try again</p> }
        </Grid>
    )
}

export default RandomChoicesSearch;