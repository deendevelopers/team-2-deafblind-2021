import React from "react";
import { Box, FormControl, FormLabel, Input, Center, Heading, Radio, RadioGroup, UnorderedList, OrderedList, ListItem, Flex } from '@chakra-ui/react';
import ChakraCustomButton from "../chakra-custom-button/ChakraCustomButton"

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

            <Box>
                <Flex direction="row">
                    <FormControl id='ingredient'>
                        <FormLabel>Add Ingredient</FormLabel>
                        <Input name="ingredient" type="text" value={recipeDetails.ingredient} onChange={handleChange}/>
                    </FormControl>
                    <ChakraCustomButton onClick={addIngedient}>Add</ChakraCustomButton>
                </ Flex>
                <UnorderedList>
                    { ingredients.map(ingredient => {
                        return (
                            <Flex direction="row" alignItems="center">
                                <ListItem fontSize="2xl" key={ingredient}>{ingredient}</ListItem>
                                <ChakraCustomButton bg="red" color="white" onClick={(event) => deleteIngredient(event, ingredient)}>Delete</ChakraCustomButton>
                            </Flex>

                        )
                        }) 
                    }
                </UnorderedList>
            </Box>

            <Box>
                <Flex direction="row">
                    <FormControl id='instruction'>
                        <FormLabel>Add Instruction</FormLabel>
                        <Input name="instruction" type="text" value={recipeDetails.instruction} onChange={handleChange}/>
                    </FormControl>
                    <ChakraCustomButton onClick={addInstruction}>Add</ChakraCustomButton>
                </ Flex>
                <OrderedList>
                    { instructions.map(instruction => {
                        return (
                            <Flex direction="row" alignItems="center">
                                <ListItem fontSize="2xl" key={instruction}>{instruction}</ListItem>
                                <ChakraCustomButton bg="red" color="white" onClick={(event) => deleteInstruction(event, instruction)}>Delete</ChakraCustomButton>
                            </Flex>

                        )
                        }) 
                    }
                </OrderedList>
            </Box>            

            <ChakraCustomButton type="submit">Submit</ChakraCustomButton>

        </form>
    )
}

export default AddRecipeForm;