import React from "react";
import { useHistory } from "react-router";
import { deleteRecipeIdToUserSavedRecipesIds } from "../../redux/user/userActions";
import CustomButton from "../custom-button/CustomButton";
import "./RecipeCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRecipeWithId } from "../../redux/recipes/recipesActions";
import {
  Box,
  Center,
  Heading,
  Image,
  Text,
  Stack,
  Button,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
// const RecipeCard = ({ recipe, isDashboard }) => {
//   const { id, title, image, vegetarian, vegan, glutenFree, dairyFree } = recipe;
//   const history = useHistory();
//   const currentUser = useSelector((state) => state.user.currentUser);
//   const dispatch = useDispatch();

//   const dietInfo = {
//     vegetarian: vegetarian ? "Yes" : "No",
//     vegan: vegan ? "Yes" : "No",
//     glutenFree: glutenFree ? "Yes" : "No",
//     dairyFree: dairyFree ? "Yes" : "No",
//   };

//   const handleDelete = () => {
//     console.log({ recipeIdToDelete: id });
//     dispatch(
//       deleteRecipeIdToUserSavedRecipesIds({
//         userId: currentUser.id,
//         recipeId: id,
//       })
//     );
//   };

//   const handleMoreDetailsClick = () => {
//     dispatch(setCurrentRecipeWithId(id));
//     history.push(`/recipes/${id}`);
//   };

//   return (
//     <article className="recipe-card-article">
//       <h3>{title}</h3>
//       <img src={image} alt={`${title} Dish`} />
//       {/* <ul>
//         {Object.keys(dietInfo).map((dietMetric) => (
//           <li key={dietMetric}>
//             {dietMetric}: {dietInfo[dietMetric]}
//           </li>
//         ))}
//       </ul> */}
//       <div className="button-container">
//         <CustomButton onClick={handleMoreDetailsClick}>
//           More Details
//         </CustomButton>
//         {isDashboard && (
//           <CustomButton
//             onClick={handleDelete}
//             style={{ backgroundColor: "red" }}
//           >
//             Delete
//           </CustomButton>
//         )}
//       </div>
//     </article>
//   );
// };
// //  <Flex justifyContent="space-between">
// //               {Object.keys(dietInfo).map((dietMetric) => {
// //                 if (dietInfo[dietMetric] === "Yes") {
// //                   return <p key={dietMetric}>{dietMetric}</p>;
// //                 }
// //               })}
// //             </Flex>

// export default RecipeCard;
export default function RecipeCard({ recipe, isDashboard }) {
  const { id, title, image, vegetarian, vegan, glutenFree, dairyFree } = recipe;
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.currentUser);
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
            layout={"fill"}
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
          {/* <Text color={"gray.500"}>{summary}</Text> */}
        </Stack>
        <Stack>
          <div className="button-container">
            <Button onClick={handleMoreDetailsClick}>More Details</Button>
            {isDashboard && (
              <Button onClick={handleDelete} style={{ backgroundColor: "red" }}>
                Delete
              </Button>
            )}{" "}
          </div>
        </Stack>
      </Box>
    </Center>
  );
}
