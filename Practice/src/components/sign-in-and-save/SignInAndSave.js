import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { saveRecipeWithSignIn } from "../../redux/user/userActions";
import CustomButton from "../custom-button/CustomButton";

const SignInAndSave = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleSignInAndSave = () => {
        dispatch(saveRecipeWithSignIn());
        history.push("/sign-in")
    }

    return (
        <article>
            <h4>Sign-in and save your recipe</h4>
            <CustomButton onClick={handleSignInAndSave}>Sign-in and save</CustomButton>
        </article>
    )
}

export default SignInAndSave;