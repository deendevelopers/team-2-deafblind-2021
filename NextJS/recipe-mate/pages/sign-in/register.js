import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, createUserProfileDocument } from "../../firebase/firebaseUtils";
import {  Center, Heading,  FormControl, FormLabel, Input, Flex } from '@chakra-ui/react';
import ChakraCustomButton from "../../components/ChakraCustomButton";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { addRecipeSlugToUserSavedRecipesSlugs } from "../../redux/user/userActions";

const Register = () => {
    const { currentUser, saveRecipeWithSignIn, recipeSlugToSaveWithSignIn } = useSelector(state => state.user);
    const router = useRouter();
    const dispatch = useDispatch();
    const initialFormInputState = { username: "", email: "", password: "", confirmPassword: "" };
    const [ formInputs, setFormInputs ] = useState(initialFormInputState); 

    useEffect(() => {
        if(currentUser) router.replace("/dashboard");
    }, [currentUser, router]);

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
            if(saveRecipeWithSignIn){
                console.log("Save Recipe with Register")
                dispatch(addRecipeSlugToUserSavedRecipesSlugs({ userId: user.uid, recipeSlug: recipeSlugToSaveWithSignIn }));
            }
            setFormInputs(initialFormInputState);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Flex as="main" direction="column" alignItems="center" p={4} minH={"90vh"}>
            <Heading as='h1' fontSize="2xl" my={4}>
                Register
            </Heading>
            <Flex as="form" direction="column" onSubmit={handleSubmit} w={{base: "90vw", md: "70vw", lg: "50vw"}}>
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
 
                <FormControl id='confirmPassword' mb={4}>
                    <FormLabel>Confirm password</FormLabel>
                    <Input name="confirmPassword" id="confirmPasswordForRegister" type="password" value={formInputs.confirmPassword} onChange={handleChange}/>
                </FormControl>
                
                <ChakraCustomButton type="submit" bg="#285E61" color="#fff">
                    Register
                </ChakraCustomButton>
            </Flex>
        </Flex>
    )
}

export default Register;