import React from "react";
import { Box, FormControl, FormLabel, Input, Center, Heading, Radio, RadioGroup, UnorderedList, OrderedList, ListItem, Flex } from '@chakra-ui/react';
import ChakraCustomButton from "../chakra-custom-button/ChakraCustomButton"
import AddInputContainer from "./AddInputContainer";

const diets = ["halal", "vegetarian", "vegan", "glutenFree", "dairyFree"];
const dietMetric = ["false", "true"];

const AddRecipeForm = ({ recipeDetails, handleChange, handleFileChange, handleSubmit, addIngedient, addInstruction, deleteInstruction, deleteIngredient, ingredients, instructions }) => {
    
    const dietsRadios = diets.map(diet => (
        <FormControl as="fieldset" key={diet}>
            <FormLabel as="legend">{diet}</FormLabel>
                { dietMetric.map((metric) => (
                        <Radio 
                            key={metric} 
                            id={metric}                            
                            name={diet}
                            value={metric}
                            isChecked={recipeDetails[diet] === metric}
                            onChange={handleChange}
                        >
                            {metric}
                        </Radio>
                    ))
                }
        </FormControl>
        )
    )

    return (
        <form onSubmit={handleSubmit}>
            
            <FormControl id='title'>
                <FormLabel>Dish Title</FormLabel>
                <Input name="title" type="text" value={recipeDetails.title} onChange={handleChange}/>
            </FormControl>
            <FormControl id='summary'>
                <FormLabel>Summary</FormLabel>
                <Input name="summary" type="text" value={recipeDetails.summary} onChange={handleChange}/>
            </FormControl>
            <FormControl id='cookingTime'>
                <FormLabel>Cooking Time</FormLabel>
                <Input name="cookingTime" type="text" value={recipeDetails.cookingTime} onChange={handleChange}/>
            </FormControl>

            <FormControl id='imageFile'>
                <FormLabel>Image File</FormLabel>
                <Input name="imageFile" type="file" onChange={handleFileChange}/>
            </FormControl>

            <FormControl as="fieldset">
                <FormLabel as="legend">Diet</FormLabel>
                {dietsRadios}
            </ FormControl>

            <AddInputContainer inputName="ingredient" savedInputNames={ingredients} recipeDetails={recipeDetails} handleChange={handleChange} addMethod={addIngedient} deleteMethod={deleteIngredient} />

            <AddInputContainer inputName="instruction" savedInputNames={instructions} recipeDetails={recipeDetails} handleChange={handleChange} addMethod={addInstruction} deleteMethod={deleteInstruction} />

            <ChakraCustomButton type="submit">Submit</ChakraCustomButton>

        </form>
    )
}

export default AddRecipeForm;