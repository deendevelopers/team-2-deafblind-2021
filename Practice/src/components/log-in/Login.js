import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebaseUtils";
import CustomButton from "../custom-button/CustomButton";
import "./LogIn.scss";

const Login = () => {
    const [ formInputs, setFormInputs ] = useState({ email: "", password: "" }); 

    const handleChange = ({ target: { name, value } }) => {
        setFormInputs(prevFormInputState => ({ 
            ...prevFormInputState,
            [name]: value
        }))
    }   

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(formInputs);
        const { email,  password } = formInputs;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setFormInputs({email: '', password:''})

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <section>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>

            <label htmlFor="emailForLogin">email: </label>
            <input name="email" id="emailForLogin" type="email" value={formInputs.email} onChange={handleChange} />

            <label htmlFor="passwordForLogin">Password: </label>
            <input name="password" id="passwordForLogin" type="password" value={formInputs.password} onChange={handleChange}/>

            {/* <input type="submit" value="Submit" /> */}
            <CustomButton type="submit">Log-In</CustomButton>

            </form>
        </section>
    )
}

export default Login;