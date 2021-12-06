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
import { Heading, Box, Flex } from "@chakra-ui/layout";
const adminIds = ["pdov9C9v0MO7y8GnGtJdf1SMjy42"];

const UserDashboardPage = () => {
  const history = useHistory();
  const currentUserId = useSelector((state) => state.user.currentUser.id);
  const savedRecipesData = useSelector((state) => state.recipes.savedRecipes);
  const dispatch = useDispatch();

  const {
    currentUser: { displayName, savedRecipesIds },
  } = useSelector((state) => state.user);
  console.log({ displayName });
  console.log({ savedRecipesIds });

  useEffect(() => {
    dispatch(getSavedRecipes(savedRecipesIds));
  }, [dispatch, savedRecipesIds, savedRecipesIds.length]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Header title="Welcome to your dashboard" userName={displayName} />
      <main className="user-dashboard-page-main">
        <CustomButton onClick={handleSignOut}>Sign-Out</CustomButton>
        <section>
          <Box px={4}>
            <Heading as="h3">Your Saved Recipes</Heading>
            <Flex direction="column">
              {savedRecipesData &&
                savedRecipesData.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} isDashboard />
                ))}
            </Flex>
          </Box>
        </section>
        {adminIds.includes(currentUserId) && (
          <CustomButton
            id="add-custom-recipe-button"
            onClick={() => history.push("/add-recipe")}
          >
            Add Custom Recipe
          </CustomButton>
        )}
      </main>
    </React.Fragment>
  );
};

export default UserDashboardPage;
