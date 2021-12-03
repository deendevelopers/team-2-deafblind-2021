import { signOut } from "@firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/custom-button/CustomButton";
import { auth } from "../../firebase/firebaseUtils";
import Header from "../../components/header/Header";
import { getSavedRecipes } from "../../redux/recipes/recipesActions";
import RecipeCard from "../../components/recipe-card/RecipeCard";
import "./UserDashboardPage.scss";

const UserDashboardPage = () => {

    const savedRecipesData = useSelector(state => state.recipes.savedRecipes);
    const dispatch = useDispatch();

    const { currentUser: { displayName, savedRecipesIds } } = useSelector(state => state.user);
    console.log({displayName});
    console.log({savedRecipesIds});
    
    useEffect(() => {
        dispatch(getSavedRecipes(savedRecipesIds));
    }, [])

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
            <main className="user-dashboard-page-main">
                {/* <p>Welcome back {userName}! We are very happy to see you!</p> */}
                <CustomButton onClick={handleSignOut}>Sign-Out</CustomButton>
                { savedRecipesIds && savedRecipesIds.map( recipeId => <p key={recipeId}>{recipeId}</p>) }
                <section className="recipe-cards-section">
                    <h2>Your Saved Recipes</h2>
                    <div className="recipe-cards-container">
                        { savedRecipesData && savedRecipesData.map(recipe => <RecipeCard id={recipe.id} title={recipe.title} imageUrl={recipe.image} vegan={recipe.vegan} vegetarian={recipe.vegetarian} glutenFree={recipe.glutenFree} diaryFree={recipe.diaryFree}/>) }
                    </div>
                </section>
            </main>
        </React.Fragment>
    )
};

export default UserDashboardPage;