import { Box, Center, Heading, Text, Stack, Flex, useColorModeValue, UnorderedList, ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md"
import VerticalStepper from "./VerticleStepper";
import Image from "next/image";

const RecipeArticle = ({ recipe }) => {
    const { title, summary, thumbnail, slug, ingredients, dietaryDetails, method, cookingTime } = recipe.fields;

    return(
        <Box
            as="article"
            w={{ base: "90vw", md: "50vw" }}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"md"}
            color="#111"
            m={5}
            overflow="hidden"
        >
            <Image
                src={"https:" + thumbnail.fields.file.url}
                alt={`The ${title} dish shown on a plate cooked`}
                width={400}
                height={300}
                layout="responsive"
            />
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
                <Text textAlign={"justify"}>{summary}</Text>
                <Text>Time to cook (in minutes): {cookingTime}</Text>
            </Stack>
            <Stack as="section" my={2} p={4}>
                <Heading as="h3" fontSize={"lg"} textAlign="center">
                    Dietary details:
                </Heading>
                <UnorderedList stylePosition="inside">
                    { dietaryDetails?.map((dietMetric) => <ListItem key={dietMetric} listStyleType="none" w="fit-content" pl={10} py={2}><ListIcon as={MdCheckCircle} color='green.500' />{dietMetric}</ListItem>) }
                </UnorderedList>
            </Stack>
            <Stack as="section" my={2} p={2}>
                <Heading as="h3" fontSize={"lg"} textAlign="center">
                List of ingredients:
                </Heading>
                <UnorderedList stylePosition="inside">
                    { ingredients?.map((ingredient) => <ListItem pl={10} py={2} key={ingredient}>{ingredient}</ListItem>) }
                </UnorderedList>
            </Stack>
        {/* <Center>  */}
            <Flex direction={{ base:"column", md: "row"}} justifyContent="space-between" px={10} py={2}> 
            {/* <Button>Start Cooking</Button> */}
                <VerticalStepper method={method} /> 
            </Flex> 
        {/* </Center>  */}
        </Box>
    )
}

export default RecipeArticle;