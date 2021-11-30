import axios from "axios";
import React, { useState } from "react";
import CustomButton from "../../components/custom-button/CustomButton";
import Header from "../../components/header/Header";
import SelectionForm from "../../components/random-search/selection-form/SelectionForm";
import RecipeArticle from "../../components/recipe-article/RecipeArticle";
import data from "../../response.json";
import "./RandomRecipePage.scss";


const RandomRecipePage = () => {

    // console.log(data.recipes[0]);

    const [dietInfo, setDietInfo] = useState({
        vegetarian: "",
        vegan: "",
        glutenFree: "",
        diaryFree: ""
    });

    const [ title, setTitle ] = useState("");
    const [ summary, setSummary ] = useState("");
    const [ imageUrl, setImageUrl ] = useState("");
    const [ cookingTime, setCookingTime ] = useState("");
    const [ ingredients, setIngredients ] = useState([]);
    const [ instructions, setInstructions ] = useState([]);
    const [ searchAgain, setSearchAgain ] = useState(false);
    const [ customRandomSearch, setCustomRandomSearch ] = useState({});
    const [ noResults, setNoResults ] = useState(false);

    const handleClick = async () => {

        // const randomRecipeData = await fetchRandomRecipe({ isCustomSearch: false });
        // console.log(randomRecipeData);
        const randomRecipeData = data.recipes[0];
        setRecipeStates(randomRecipeData);

        setSearchAgain(true);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomRandomSearch(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const setRecipeStates = (randomRecipeData ) => {
        setDietInfo({
            vegetarian: randomRecipeData.vegetarian ? "Yes": "No",
            vegan: randomRecipeData.vegan ? "Yes": "No",
            glutenFree: randomRecipeData.glutenFree ? "Yes": "No",
            diaryFree: randomRecipeData.diaryFree ? "Yes": "No"
        })
        
        setTitle(randomRecipeData.title);
        setSummary(randomRecipeData.summary);
        setImageUrl(randomRecipeData.image);
        setCookingTime(randomRecipeData.readyInMinutes);

        const { extendedIngredients } = randomRecipeData;
        const ingredientsNames = extendedIngredients.map(ingredient => ingredient.name);
        //Remove duplicates:
        const uniqueIngredients = [...new Set(ingredientsNames)];
        setIngredients(uniqueIngredients);

        const [{ steps }] = randomRecipeData.analyzedInstructions;
        // console.log(steps);
        setInstructions(steps);
    }

    const handleCustomSearch = async (e) => {
        e.preventDefault();

        // for each custom search state - add to tags separated by commas to endpoint
        const customEndPoint = ["&tags="];
        Object.values(customRandomSearch).forEach(parameter => customEndPoint.push(parameter+ ","));
        console.log(customEndPoint);
        
        // remove last comma
        const lastElement = customEndPoint[customEndPoint.length - 1];
        console.log(lastElement);
        const lastCharacterOfLastElement = lastElement[lastElement.length -1 ];
        if(lastCharacterOfLastElement === ",") {
            customEndPoint[customEndPoint.length -1] = lastElement.slice(0, -1);
        }
        console.log(customEndPoint);

        const customEndPointString = customEndPoint.join("").toLowerCase();
        console.log(customEndPointString);

        // const randomRecipeData = await fetchRandomRecipe({ isCustomSearch: true, customEndPoint });
        // console.log(randomRecipeData);
        const randomRecipeData = data.recipes[0];

        if(randomRecipeData){
            setRecipeStates(randomRecipeData);
            setNoResults(false);
        }else{
            setNoResults(true);
        } ;

        setCustomRandomSearch([]);
        setSearchAgain(true);

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
                        <RecipeArticle title={title} summary={summary} dietInfo={dietInfo} cookingTime={cookingTime} imageUrl={imageUrl} ingredients={ingredients} instructions={instructions}/>
                    </React.Fragment>
                }
            </main>
        </React.Fragment>
    )
}

const fetchRandomRecipe = async ( { isCustomSearch, customEndPoint } ) => {

    const API_KEY = "1fae167ef83a4a56b244effeb1a158ec";

    if(!isCustomSearch){
        const response = await axios.get("https://api.spoonacular.com/recipes/random?apiKey=" + API_KEY);
        console.log("Ran fetch")
        console.log(response);
        const { recipes } = await response.data;
        const randomRecipeData = recipes[0];
        return randomRecipeData
    } else {
        const response = await axios.get("https://api.spoonacular.com/recipes/random?apiKey=" + API_KEY + customEndPoint);
        console.log("Ran Custom fetch")
        console.log(response);
        const { recipes } = await response.data;
        const randomRecipeData = recipes[0];
        return randomRecipeData
    }
}

export default RandomRecipePage;