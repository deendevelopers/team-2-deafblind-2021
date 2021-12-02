import { signOut } from "@firebase/auth";
import React from "react";
import { useSelector } from "react-redux";
import CustomButton from "../../components/custom-button/CustomButton";
import { auth } from "../../firebase/firebaseUtils";

const UserDashboardPage = () => {

    const userName = useSelector(state => state.user.currentUser.displayName);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <React.Fragment>
            <main>
                <p>User Dashboard</p>
                <p>Welcome back {userName}! We are very happy to see you!</p>
                <CustomButton onClick={handleSignOut}>Sign-Out</CustomButton>
            </main>
        </React.Fragment>
    )
};

export default UserDashboardPage;