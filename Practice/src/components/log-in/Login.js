import React, { useState } from "react";
import "./LogIn.scss";

const Login = () => {
    const [ formInputs, setFormInputs ] = useState({ username: "", password: "" }); 

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
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>

            <label htmlFor="usernameForLogin">Username: </label>
            <input name="username" id="usernameForLogin" type="text" value={formInputs.username} onChange={handleChange} />

            <label htmlFor="passwordForLogin">Password: </label>
            <input name="password" id="passwordForLogin" type="password" value={formInputs.password} onChange={handleChange}/>

            <input type="submit" value="Submit" />

            </form>
        </section>
    )
}

export default Login;