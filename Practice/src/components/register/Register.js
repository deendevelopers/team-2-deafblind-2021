import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, createUserProfileDocument } from "../../firebase/firebaseUtils";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../../redux/recipes/recipesActions";
import { addRecipeIdToUserSavedRecipesIds } from "../../redux/user/userActions";
import {
    Center,
    Heading,
    FormControl,
    FormLabel,
    Input,
  } from '@chakra-ui/react';
import ChakraCustomButton from "../chakra-custom-button/ChakraCustomButton";
  
const Register = () => {
    const saveRecipeWithSignIn = useSelector(state => state.user.saveRecipeWithSignIn);
    const currentRecipe = useSelector(state => state.recipes.currentRecipe);
    const dispatch = useDispatch();

    const initialFormInputState = { username: "", email: "", password: "", confirmPassword: "" };
    const [ formInputs, setFormInputs ] = useState(initialFormInputState); 

    const handleChange = ({ target: { name, value } }) => {
        setFormInputs(prevFormInputState => ({ 
            ...prevFormInputState,
            [name]: value
        }))
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(formInputs);
        const { username, email, password, confirmPassword } = formInputs;

        if(password !== confirmPassword){
            alert("Passwords dont match!")
            return
        }

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await createUserProfileDocument(user, { displayName: username });
            // console.log(user, { displayName: username });

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
            setFormInputs(initialFormInputState);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="register-section">
            <Center>
                <Heading as='h2' fontSize="2xl" m={[6, 0]}>
                    Register
                </Heading>
            </Center>
            <form className="register-form" onSubmit={handleSubmit}>

                <FormControl id='username'>
                    <FormLabel>Choose a username</FormLabel>
                    <Input name="username" id="usernameForRegister" type="text" value={formInputs.username} onChange={handleChange}/>
                </FormControl>

                <FormControl id='email'>
                    <FormLabel>Enter email address</FormLabel>
                    <Input name="email" id="emailForRegister" type="email" value={formInputs.email} onChange={handleChange}/>
                </FormControl>

                <FormControl id='password'>
                    <FormLabel>Choose a password</FormLabel>
                    <Input name="password" id="passwordForRegister" type="password" value={formInputs.password} onChange={handleChange}/>
                </FormControl>
 
                <FormControl id='confirmPassword'>
                    <FormLabel>Confirm password</FormLabel>
                    <Input name="confirmPassword" id="confirmPasswordForRegister" type="password" value={formInputs.confirmPassword} onChange={handleChange}/>
                </FormControl>
                
                <ChakraCustomButton type="submit" bg="#285E61" color="#fff">
                    Register
                </ChakraCustomButton>

            </form>
        </section>
    )
}

export default Register;