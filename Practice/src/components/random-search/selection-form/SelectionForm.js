import React from "react";
import Select from 'react-select'

const diets = ["", "vegetarian", "vegan", "gluten free", "ketogenic", "primal", "paleo", "pescetarian"];
const mealTypes = ["", "main course", "side dish", "dessert", "appetizer", "salad", "bread", "breakfast", "soup", "beverage", "sauce", "marinade", "fingerfood", "snack", "drink"];
// const cuisines = ["", "African", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"];

const dietsOptions = diets.reduce((acc, cur) => [ ...acc, { value: cur, label: cur }], [])
console.log("Diets Options", dietsOptions);
const mealTypesOptions = mealTypes.reduce((acc, cur) => [ ...acc, { value: cur, label: cur }], [])
console.log("mealTypes Options", mealTypesOptions);

const SelectionForm = ({ handleSubmit, customDietRandomSearch, setCustomDietRandomSearch, customMealTypeRandomSearch, setCustomMealTypeRandomSearch }) => (
    <form onSubmit={(e) => handleSubmit(e)}>
        <Select isMulti defaultValue={customDietRandomSearch} onChange={setCustomDietRandomSearch} options={dietsOptions} />
        <Select isMulti defaultValue={customMealTypeRandomSearch} onChange={setCustomMealTypeRandomSearch} options={mealTypesOptions} />
        <button type="submit">Run Custom Search</button>
    </form>
);

export default SelectionForm;