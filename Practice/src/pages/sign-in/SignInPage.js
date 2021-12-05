import React from "react";
import Register from "../../components/register/Register";
import LogIn from "../../components/log-in/Login";
import Header from "../../components/header/Header";
import "./SignInPage.scss";

const SignInPage = () => (
    <React.Fragment>
        <Header title="Log in or Register for a more personalised experience" />
        <main className="signinpage-main">
            <article className="login-register-article">
                <LogIn />   
                <Register />
            </article>
        </main>
    </React.Fragment>
)

export default SignInPage;