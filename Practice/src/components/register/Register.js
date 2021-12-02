import React, { useState } from "react";
import "./Register.scss";

const Register = () => {
    const [ formInputs, setFormInputs ] = useState({ username: "", email: "", password: "", confirmPassword: "" }); 

    const handleChange = ({ target: { name, value } }) => {
        setFormInputs(prevFormInputState => ({ 
            ...prevFormInputState,
            [name]: value
        }))
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(formInputs);
    }

    return (
        <section>
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>

                <label htmlFor="usernameForRegister">Username: </label>
                <input name="username" id="usernameForRegister" type="text" value={formInputs.username} onChange={handleChange}/>

                <label htmlFor="emailForRegister">Email: </label>
                <input name="email" id="emailForRegister" type="email" value={formInputs.email} onChange={handleChange}/>

                <label htmlFor="passwordForRegister">Password: </label>
                <input name="password" id="passwordForRegister" type="password" value={formInputs.password} onChange={handleChange}/>

                <label htmlFor="confirmPasswordForRegister">Confirm Password: </label>
                <input name="confirmPassword" id="confirmPasswordForRegister" type="password" value={formInputs.confirmPassword} onChange={handleChange}/>

                <input type="submit" value="Submit" />

            </form>
        </section>
    )
}

export default Register;