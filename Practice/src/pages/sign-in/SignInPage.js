import React from "react";
import Register from "../../components/register/Register";
import LogIn from "../../components/log-in/LogIn";
import "./SignInPage.scss";

const SignInPage = () => (
    <React.Fragment>
        <main>
            <p>Sign In Page</p>
            <article className="login-register-article">
                <LogIn />   
                <Register />
            </article>
        </main>
    </React.Fragment>
)

export default SignInPage;