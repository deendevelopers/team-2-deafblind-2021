import React from "react";
import { getUniqueIngredients } from "../../components/random-search/helperFunctions";
import "./RecipeArticle.scss";
import Vertical from "../../components/stepper/Stepper";
import { Button } from "@chakra-ui/button";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
// const RecipeArticle = ({
//   currentRecipe: {
//     title,
//     summary,
//     image,
//     readyInMinutes,
//     vegan,
//     vegetarian,
//     glutenFree,
//     dairyFree,
//     extendedIngredients,
//     analyzedInstructions: [{ steps }],
//   },
// }) => {
//   // console.log(title, extendedIngredients);

//   const dietInfo = {
//     vegetarian: vegetarian ? "Yes" : "No",
//     vegan: vegan ? "Yes" : "No",
//     glutenFree: glutenFree ? "Yes" : "No",
//     dairyFree: dairyFree ? "Yes" : "No",
//   };

//   const uniqueIngredients = getUniqueIngredients(extendedIngredients);

//   return title ? (
//     <article className="recipe-article">
//       <header>
//         <h2>{title}</h2>
//         <aside>
//           <img src={image} alt={`The ${title} dish shown on a plate cooked`} />
//           <div>
//             <p>{summary.replace(/(<([^>]+)>)/gi, "")}</p>
//             <p>Time to cook: {readyInMinutes} minutes</p>
//           </div>
//         </aside>
//       </header>
//       <div className="diet-ingredients-container">
//         <section>
//           <h3>Dietary details:</h3>
//           {Object.keys(dietInfo).map((dietMetric) => (
//             <p key={dietMetric}>
//               {dietMetric}: {dietInfo[dietMetric]}
//             </p>
//           ))}
//         </section>
//         <section>
//           <h3>List of ingredients:</h3>
//           <ul>
//             {extendedIngredients &&
//               uniqueIngredients.map((ingredient) => (
//                 <li key={ingredient}>{ingredient}</li>
//               ))}
//           </ul>
//         </section>
//       </div>
//       <section>
//         <h3>Cooking instructions:</h3>
//         <ol>
//           {steps &&
//             steps.map((instruction) => (
//               <li key={instruction.number}>{instruction.step}</li>
//             ))}
//         </ol>
//       </section>
//     </article>
//   ) : (
//     <h2 className="starting-instruction">
//       Please click on the button to find yourself a random recipe to make today!
//     </h2>
//   );
// };

// export default RecipeArticle;
const RecipeArticle = ({
  currentRecipe: {
    title,
    summary,
    image,
    readyInMinutes,
    vegan,
    vegetarian,
    glutenFree,
    dairyFree,
    extendedIngredients,
    analyzedInstructions,
  },
}) => {
  const dietInfo = {
    Vegetarian: vegetarian ? "Yes" : "No",
    Vegan: vegan ? "Yes" : "No",
    " Gluten Free": glutenFree ? "Yes" : "No",
    "Dairy Free": dairyFree ? "Yes" : "No",
  };

  const uniqueIngredients = getUniqueIngredients(extendedIngredients);
  const steps = analyzedInstructions[0].steps;
  console.log(analyzedInstructions[0].steps);

  return (
    <Center py={6} px={4}>
      <Box
        maxW={"445px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
        color="#111"
      >
        <Box
          h={"210px"}
          //   bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <img src={image} alt={`The ${title} dish shown on a plate cooked`} />
        </Box>
        <Stack>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text>{summary.replace(/(<([^>]+)>)/gi, "")}</Text>
        </Stack>
        <section>
          <Stack my={2}>
            <Heading as="h3" fontSize={"lg"}>
              Dietary details:
            </Heading>
            <Flex justifyContent="space-between">
              {Object.keys(dietInfo).map((dietMetric) => {
                if (dietInfo[dietMetric] === "Yes") {
                  return <p key={dietMetric}>{dietMetric}</p>;
                }
              })}
            </Flex>
          </Stack>
        </section>
        <section>
          <Stack my={2}>
            <Heading as="h3" fontSize={"lg"}>
              List of ingredients:
            </Heading>
            <ul>
              {extendedIngredients &&
                uniqueIngredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
          </Stack>
        </section>
        <Center>
          <Button>Start Cooking</Button>
        </Center>
        {/* <Vertical steps={steps} /> */}
        {/* <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar
            src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
            alt={"Author"}
          />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>Achim Rolle</Text>
            <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
          </Stack>
        </Stack> */}
      </Box>
    </Center>
  );
};
export default RecipeArticle;
