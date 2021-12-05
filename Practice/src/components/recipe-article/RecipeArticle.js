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
  Flex,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";

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
          <Image
            src={image}
            alt={`The ${title} dish shown on a plate cooked`}
            layout={"fill"}
          />
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
        <Vertical steps={steps} />
      </Box>
    </Center>
  );
};
export default RecipeArticle;
