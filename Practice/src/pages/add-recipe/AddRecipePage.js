import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCustomRecipeToFirebase } from "../../redux/recipes/recipesActions";
import AddRecipeForm from "../../components/add-recipe-form/AddRecipeForm";
import { addImageFileToFirebaseStorage } from "../../firebase/firebaseUtils";
import {Center, Box} from '@chakra-ui/react';

const AddRecipePage = () => {

    const dispatch = useDispatch();

    const initialRecipeDetails = {
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
    };
    const [ recipeDetails, setRecipeDetails ] = useState(initialRecipeDetails);
    const [ ingredients, setIngredients ] = useState([]);
    const [ instructions, setInstructions ] = useState([]);
    const [ imageFile, setImageFile ] = useState({});
    const [ imageUrl, setImageUrl ] = useState("");

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

    const deleteInstruction = (event, instructionToDelete) => {
        event.preventDefault();
        setInstructions(exisitingInstructions => exisitingInstructions.filter(instruction => instruction !== instructionToDelete));
    }

    const handleFileChange = (event) => {
        console.log(event.target.files);
        const file = event.target.files[0]

        if (!file) {
            console.log("No file uploaded")
        } else {
            console.log("Some file uploaded")
            setImageFile(file)
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting");

        // generate random unique id using timestamp 
        const id = new Date().valueOf();
        console.log({id});
        const instructionsModified = instructions.map((step, index) => ({ step, number: index+1 }))

        const newRecipe = {
            id,
            imageUrl: "", 
            ...recipeDetails,
            ingredients,
            instructionsModified
        };

        dispatch(addCustomRecipeToFirebase(newRecipe))
        
        // upload file to firebase storage and update recipe in firestore to include imageUrl
        console.log({imageFile})
        if(imageFile){
            const imageUrlFirebase = await addImageFileToFirebaseStorage(id, imageFile)
        }
        // reset states
        setRecipeDetails(initialRecipeDetails);
        setIngredients([]);
        setInstructions([]);
        console.log("Submitted!")
    }

    return (
        <Center>
            <Box w="80vw">
                <AddRecipeForm 
                    handleChange={handleChange} handleFileChange={handleFileChange} handleSubmit={handleSubmit} 
                    addInstruction={addInstruction} addIngedient={addIngedient} deleteIngredient={deleteIngredient} deleteInstruction={deleteInstruction}
                    recipeDetails={recipeDetails} ingredients={ingredients} instructions={instructions}
                    setImageFile={setImageFile} setImageUrl={setImageUrl}
                />
            </Box>
        </ Center>
    )
}

export default AddRecipePage;