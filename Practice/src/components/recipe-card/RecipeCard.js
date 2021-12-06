import React from "react";
import { useHistory } from "react-router";
import { deleteRecipeIdToUserSavedRecipesIds } from "../../redux/user/userActions";
import "./RecipeCard.scss";
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
    <Center py={6}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"210px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image
            src={image}
            alt={`The ${title} dish shown on a plate cooked`}
            // layout={"fill"}
            sx={{ objectFit: "none" }}
          />
        </Box>
        <Stack>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"lg"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text color={"gray.500"} noOfLines={3}>
            {fullRecipeData &&
              fullRecipeData.summary.replace(/(<([^>]+)>)/gi, "")}
          </Text>
        </Stack>
        <Stack>
          <Flex pt={3} justifyContent="space-between">
            <Button onClick={handleMoreDetailsClick}>More Details</Button>
            {isDashboard && (
              <Button onClick={handleDelete} style={{ backgroundColor: "red" }}>
                Delete
              </Button>
            )}
          </Flex>
        </Stack>
      </Box>
    </Center>
  );
}
