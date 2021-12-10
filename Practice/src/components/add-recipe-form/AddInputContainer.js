import React from "react";
import { Box, FormControl, FormLabel, Input, UnorderedList, OrderedList, ListItem, Flex } from '@chakra-ui/react';
import ChakraCustomButton from "../chakra-custom-button/ChakraCustomButton"

const AddInputContainer = ({ inputName, savedInputNames, recipeDetails, addMethod, deleteMethod, handleChange }) => {
    const savedInputNamesList = savedInputNames.map(savedInput => (
        <Flex direction="row" alignItems="center">
            <ListItem fontSize="2xl" key={savedInput}>{savedInput}</ListItem>
            <ChakraCustomButton bg="red" color="white" onClick={(event) => deleteMethod(event, savedInput)}>Delete</ChakraCustomButton>
        </Flex>

    ))

    return (
        <Box>
            <Flex direction="row">
                <FormControl id={inputName}>
                    <FormLabel>Add {inputName}</FormLabel>
                    <Input name={inputName} type="text" value={recipeDetails[inputName]} onChange={handleChange}/>
                </FormControl>
                <ChakraCustomButton onClick={addMethod}>Add</ChakraCustomButton>
            </ Flex>
            { inputName==="instruction" ? <OrderedList>{savedInputNamesList}</OrderedList> : <UnorderedList>{savedInputNamesList}</ UnorderedList> }
        </Box>          
    )
}


export default AddInputContainer;