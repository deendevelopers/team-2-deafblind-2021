import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebaseUtils";
import CustomButton from "../custom-button/CustomButton";
// import "./LogIn.scss";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../../redux/recipes/recipesActions";
import { addRecipeIdToUserSavedRecipesIds } from "../../redux/user/userActions";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button
  } from '@chakra-ui/react'

const Login = () => {

    const saveRecipeWithSignIn = useSelector(state => state.user.saveRecipeWithSignIn);
    const currentRecipe = useSelector(state => state.recipes.currentRecipe);
    const dispatch = useDispatch();

    const [ formInputs, setFormInputs ] = useState({ email: "", password: "" }); 

    const handleChange = ({ target: { name, value } }) => {
        setFormInputs(prevFormInputState => ({ 
            ...prevFormInputState,
            [name]: value
        }))
    }   

    const handleSubmit = async (event) => {
        event.preventDefault();

        // console.log(formInputs);
        const { email,  password } = formInputs;

        try {
            const { user } =  await signInWithEmailAndPassword(auth, email, password);

            const { id } = currentRecipe;
            // Saving recipe for new user
            if(saveRecipeWithSignIn){
                console.log("Handle Save Recipe")
                // Save/add recipe to redux recipe slice 
                dispatch(addRecipe(currentRecipe));
                // console.log(user);
                // Save/add recipe ID to redux saved recipes array in current user slice
                dispatch(addRecipeIdToUserSavedRecipesIds({ userId: user.uid, recipeId: id }));
            }
            setFormInputs({email: '', password:''})

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="login-section">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>

            <FormControl id='email'>
                <FormLabel>Email address</FormLabel>
                <Input name="email" id="emailForLogin" type="email" value={formInputs.email} onChange={handleChange}/>
            </FormControl>

            <FormControl id='password'>
                <FormLabel>Password</FormLabel>
                <Input name="password" id="passwordForLogin" type="password" value={formInputs.password} onChange={handleChange}/>
            </FormControl>

            <Button
                type="submit"
                size="lg"
                borderLeftRadius="0"
                bg="#285E61"
                color="#fff"
                h="100%"
                _active={{
                    bg: "teal.700",
                    transform: "scale(0.98)",
                    borderColor: "#bec3c9",
                }}
                _hover={{
                    bg: "teal.600",
                    transform: "scale(0.98)",
                    borderColor: "#bec3c9",
                }}
                >
                    Log-In
                </Button>
            </ form>
        </section>
    )
}

export default Login;