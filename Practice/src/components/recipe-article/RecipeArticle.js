import React from "react";
import { getUniqueIngredients } from "../../components/random-search/helperFunctions";
import "./RecipeArticle.scss";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
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
export default function RecipeArticle() {
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
      >
        <Box
          h={"210px"}
          //   bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <img
            src={
              "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            }
            // layout={"fill"}
          />
        </Box>
        <Stack>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            Boost your conversion rate
          </Heading>
          <Text color={"gray.500"}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </Text>
        </Stack>
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
}
