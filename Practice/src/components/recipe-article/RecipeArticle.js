import React from "react";
import { getUniqueIngredients } from "../../components/random-search/helperFunctions";
import VerticalStepper from "../../components/stepper/Stepper";
import { Box, Center, Heading, Text, Stack, Flex, Image, useColorModeValue, UnorderedList, ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md"

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
        as="article"
        maxW={{ base: "100vw", md: "50vw" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        color="#111"
      >
        <Box overflow={"hidden"}>
          <Image
            transform={"scale(1.25)"}
            w={"100%"}
            src={image}
            alt={`The ${title} dish shown on a plate cooked`}
          />
        </Box>
        <Stack as="section" mt={2} p={5}>
          <Heading
            as="h2"
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
            textAlign={"center"}
          >
            {title}
          </Heading>
          <Text textAlign={"justify"}>{summary.replace(/(<([^>]+)>)/gi, "")}</Text>
        </Stack>
        <Stack as="section" my={2} p={4}>
          <Heading as="h3" fontSize={"lg"} textAlign="center">
            Dietary details:
          </Heading>
          <Flex justifyContent="space-between">
            <UnorderedList>
            {Object.keys(dietInfo).map((dietMetric) => {
              if (dietInfo[dietMetric] === "Yes") {
                return <ListItem key={dietMetric} listStyleType="none"><ListIcon as={MdCheckCircle} color='green.500' />{dietMetric}</ListItem>;
              }
              return "";
            })}
          </UnorderedList>
          </Flex>
        </Stack>
        <Stack as="section" my={2} p={2}>
          <Heading as="h3" fontSize={"lg"} textAlign="center">
            List of ingredients:
          </Heading>
          <UnorderedList stylePosition="inside">
            {extendedIngredients &&
              uniqueIngredients.map((ingredient) => (
                <ListItem pl={10} py={2} key={ingredient}>{ingredient}</ListItem>
              ))}
          </UnorderedList>
        </Stack>
        {/* <Center> */}
          <Flex direction={{ base:"column", md: "row"}} justifyContent="space-between" px={10} py={2}>
          {/* <Button>Start Cooking</Button> */}
            <VerticalStepper steps={steps} />
          </Flex>
        {/* </Center> */}
      </Box>
    </Center>
  );
};
export default RecipeArticle;
