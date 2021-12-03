import { signOut } from "@firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../components/custom-button/CustomButton";
import { auth } from "../../firebase/firebaseUtils";
import Header from "../../components/header/Header";
const UserDashboardPage = () => {

    const { currentUser: { displayName, savedRecipes } } = useSelector(state => state.user);
    console.log(displayName);
    console.log(savedRecipes);
    
    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <React.Fragment>
            <Header title="Welcome to your dashboard" userName={displayName} />
            <main>
                {/* <p>Welcome back {userName}! We are very happy to see you!</p> */}
                { savedRecipes && savedRecipes.map( recipe => <p key={recipe}>{recipe}</p>) }
                <CustomButton onClick={handleSignOut}>Sign-Out</CustomButton>
            </main>
        </React.Fragment>
    )
};

export default UserDashboardPage;