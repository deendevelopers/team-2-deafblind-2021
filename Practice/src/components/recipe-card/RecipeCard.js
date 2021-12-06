import React from "react";
import { useHistory } from "react-router";
import { deleteRecipeIdToUserSavedRecipesIds } from "../../redux/user/userActions";
// import "./RecipeCard.scss";
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

export default function RecipeCard({ recipe, isDashboard }) {
  const { id, title, image } = recipe;
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.currentUser);
  const fullRecipeData = useSelector((state) =>
    state.recipes.savedRecipes.find((recipe) => recipe.id === id)
  );
  console.log({ fullRecipeData });


  const dispatch = useDispatch();
  const handleDelete = () => {
    console.log({ recipeIdToDelete: id });
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

  console.log(recipe);
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
          // layout={"fill"}
          // sx={{ objectFit: "none" }}
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
            {fullRecipeData &&
              fullRecipeData.summary.replace(/(<([^>]+)>)/gi, "")}
          </Text>
        </Stack>
        <Stack>
          <Flex m={2} justifyContent="space-between">
            <Button onClick={handleMoreDetailsClick}>More Details</Button>
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
