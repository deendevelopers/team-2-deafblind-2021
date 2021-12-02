import React from "react";
import Register from "../../components/register/Register";
import Login from "../../components/log-in/Login";

const SignInPage = () => (
    <React.Fragment>
        <main>
            <p>Sign In Page</p>
            <Login />
            <Register />
        </main>
    </React.Fragment>
)

export default SignInPage;