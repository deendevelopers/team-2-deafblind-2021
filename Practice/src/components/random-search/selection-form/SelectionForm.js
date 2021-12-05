import React from "react";
import CustomButton from "../../custom-button/CustomButton";
import SelectInput from "../dropdown-inputs/SelectInput";
import "./SelectionForm.scss";

const diets = ["vegetarian", "vegan", "gluten free", "ketogenic", "primal", "paleo", "pescetarian"];
const mealTypes = ["main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "marinade", "fingerfood", "snack", "drink"];

const SelectionForm = ({ handleSubmit, handleChange }) => (
    <form className="random-search-form" onSubmit={(e) => handleSubmit(e)}>

        <SelectInput name="diet" handleChange={handleChange} options={diets} defaultSelect="Diets"/>
        <SelectInput name="mealTypes" handleChange={handleChange} options={mealTypes} defaultSelect="Meal Types"/>

        <CustomButton type="submit">Run Custom Search</CustomButton>
    </form>
);

export default SelectionForm;