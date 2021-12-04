import React from "react";

const SelectInput = ({ name, handleChange, options }) => (
    <label htmlFor={name+"Input"}><span className="label-text">{name}:</span>
        <select
            id={name+"Input"} 
            onChange={handleChange}
            name={name} 
            type='text'
        >
            {options.map((option, index) => <option key={option+index} value={option}>{option ? option : "Please chose"}</option>)}
        </select>
    </label>
)

export default SelectInput; 