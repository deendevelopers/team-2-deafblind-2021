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
    Input,
    Center,
    Heading
  } from '@chakra-ui/react'
import ChakraCustomButton from "../chakra-custom-button/ChakraCustomButton";
import { useHistory } from "react-router";

const Login = () => {

    const history = useHistory();
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
        history.push("/dashboard");
    }

    return (
        <section className="login-section">
            <Center>
                <Heading as='h2' fontSize="2xl" m={[10, 0]}>
                    Log in
                </Heading>
            </Center>            
            
            <form className="login-form" onSubmit={handleSubmit}>

                <FormControl id='email'>
                    <FormLabel>Email address</FormLabel>
                    <Input name="email" id="emailForLogin" type="email" value={formInputs.email} onChange={handleChange}/>
                </FormControl>

                <FormControl id='password'>
                    <FormLabel>Password</FormLabel>
                    <Input name="password" id="passwordForLogin" type="password" value={formInputs.password} onChange={handleChange}/>
                </FormControl>

    
                <ChakraCustomButton type="submit" bg="#285E61" color="#fff">
                    Log-In
                </ChakraCustomButton>
            
            </ form>
        </section>
    )
}

export default Login;