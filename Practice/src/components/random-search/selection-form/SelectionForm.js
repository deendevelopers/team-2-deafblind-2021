import React from "react";
import SelectInput from "../dropdown-inputs/SelectInput";
import ChakraCustomButton from "../../chakra-custom-button/ChakraCustomButton";

const diets = ["vegetarian", "vegan", "gluten free", "ketogenic", "primal", "paleo", "pescetarian"];
const mealTypes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "marinade", "fingerfood", "snack", "drink"];

const SelectionForm = ({ handleSubmit, handleChange }) => (
    <form className="random-search-form" onSubmit={(e) => handleSubmit(e)}>

        <SelectInput name="diet" handleChange={handleChange} options={diets} defaultSelect="Diets"/>
        <SelectInput name="mealTypes" handleChange={handleChange} options={mealTypes} defaultSelect="Meal Types"/>

        <ChakraCustomButton type="submit">Run Custom Search</ChakraCustomButton>
    </form>
);

export default SelectionForm;