import React from "react";
import "./SelectInput.scss";

const SelectInput = ({ name, handleChange, options, defaultSelect }) => (
        <select
            className="select-input"
            onChange={handleChange}
            name={name} 
            type='text'
            aria-label={defaultSelect}
        >
            <option value="" disabled selected>{defaultSelect}</option>
            {options.map((option, index) => <option key={option+index} value={option}>{option ? option : "Please chose"}</option>)}
        </select>
)

export default SelectInput; 