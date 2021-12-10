import React from "react";
import { useHistory } from "react-router";
import { deleteRecipeIdToUserSavedRecipesIds, addRecipeIdToUserSavedRecipesIds } from "../../redux/user/userActions";
import { addRecipe } from "../../redux/recipes/recipesActions";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRecipeWithId } from "../../redux/recipes/recipesActions";
import {
  Box,
  Center,
  Heading,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import SaveRecipeButton from "../save-recipe-button/SaveRecipeButton";

export default function RecipeCard({ recipe, isDashboard }) {
  // console.log(recipe);
  const { id, title, image } = recipe;
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleDelete = () => {
    dispatch(
      deleteRecipeIdToUserSavedRecipesIds({
        userId: currentUser.id,
        recipeId: id,
      })
    );
  };

  const handleMoreDetailsClick = () => {
    dispatch(setCurrentRecipeWithId(id));
    history.push(`/recipes/${id}`);
  };

  const handleSaveRecipe = () => {
    console.log("Handle Save Recipe")
    // const { id } = recipe;
    // Save/add recipe to redux recipe slice 
    dispatch(addRecipe(recipe));
    // Save/add recipe ID to redux saved recipes array in current user slice
    const recipeIdNumber = Number(id)
    dispatch(addRecipeIdToUserSavedRecipesIds({ userId: currentUser.id, recipeId: recipeIdNumber }));
  }

  // console.log(recipe);
  return (
    <Center marginTop={5}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        // p={6}
        overflow={"hidden"}
      >
        <Image
          w={"inherit"}
          src={image}
          alt={`The ${title} dish shown on a plate cooked`}
        />
        <Stack p={4}>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"xl"}
            fontFamily={"body"}
            noOfLines={1}
          >
            {title}
          </Heading>
          <Text color={"gray.500"} noOfLines={2}>
            {recipe.summary.replace(/(<([^>]+)>)/gi, "")}
          </Text>
        </Stack>
        <Stack>
          <Flex m={2} justifyContent="space-between">
            <Button onClick={handleMoreDetailsClick}>More Details</Button>
            { (currentUser && !isDashboard) && <SaveRecipeButton isCard savedRecipesIds={currentUser.savedRecipesIds} currentRecipeId={id} handleSaveRecipe={handleSaveRecipe} />}
            {isDashboard && (
              <Button onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>
                Delete
              </Button>
            )}
          </Flex>
        </Stack>
      </Box>
    </Center>
  );
}