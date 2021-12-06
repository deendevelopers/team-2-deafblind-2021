import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { saveRecipeWithSignIn } from "../../redux/user/userActions";
import ChakraCustomButton from "../chakra-custom-button/ChakraCustomButton";

const SignInAndSave = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSignInAndSave = () => {
        dispatch(saveRecipeWithSignIn());
        history.push("/sign-in")
    }

    return (
        <article>
            <h4>Sign-in and save this recipe</h4>
            <ChakraCustomButton onClick={handleSignInAndSave}>Sign-in and save</ChakraCustomButton>
        </article>
    )
}

export default SignInAndSave;