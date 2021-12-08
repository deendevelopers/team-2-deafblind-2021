import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { saveRecipeWithSignIn } from "../../redux/user/userActions";
import ChakraCustomButton from "../chakra-custom-button/ChakraCustomButton";
import {
    Flex,
    Heading,
  } from "@chakra-ui/react";

const SignInAndSave = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSignInAndSave = () => {
        dispatch(saveRecipeWithSignIn());
        history.push("/sign-in")
    }

    return (
        <Flex direction={{ base: "column", md: "row" }} alignItems="center" justifyContent="center">
            <Heading as="h3" fontSize="2xl">Sign-in and save this recipe</Heading>
            <ChakraCustomButton onClick={handleSignInAndSave}>Sign-in and save</ChakraCustomButton>
        </Flex>
    )
}

export default SignInAndSave;