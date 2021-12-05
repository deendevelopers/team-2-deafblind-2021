import { signOut } from "@firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../components/custom-button/CustomButton";
import { auth } from "../../firebase/firebaseUtils";
import Header from "../../components/header/Header";
import { getSavedRecipes } from "../../redux/recipes/recipesActions";
import RecipeCard from "../../components/recipe-card/RecipeCard";
import "./UserDashboardPage.scss";
import { useHistory } from "react-router";

const adminIds = ["pdov9C9v0MO7y8GnGtJdf1SMjy42"];

const UserDashboardPage = () => {
    const history = useHistory();
    const currentUserId = useSelector(state => state.user.currentUser.id);
    const savedRecipesData = useSelector(state => state.recipes.savedRecipes);
    const dispatch = useDispatch();

    const { currentUser: { displayName, savedRecipesIds } } = useSelector(state => state.user);
    console.log({displayName});
    console.log({savedRecipesIds});
    
    useEffect(() => {
        dispatch(getSavedRecipes(savedRecipesIds));
    }, [dispatch, savedRecipesIds.length])

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
                {/* { savedRecipesIds && savedRecipesIds.map( recipeId => <p key={recipeId}>{recipeId}</p>) } */}
                <section className="recipe-cards-section">
                    <h2>Your Saved Recipes</h2>
                    <div className="recipe-cards-container">
                        { savedRecipesData && savedRecipesData.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} isDashboard />) }
                    </div>
                </section>
                { adminIds.includes(currentUserId) && <CustomButton id="add-custom-recipe-button" onClick={() => history.push("/add-recipe")}>Add Custom Recipe</CustomButton> }
            </main>
        </React.Fragment>
    )
};

export default UserDashboardPage;