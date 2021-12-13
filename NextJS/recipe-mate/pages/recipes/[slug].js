import { createClient } from "contentful"
import { Box, Center, Heading, Text, Stack, Flex, Image, useColorModeValue, UnorderedList, ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md"
import VerticalStepper from "../../components/VerticleStepper";

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async () => {

    const response = await client.getEntries({
        content_type: "recipe",
    });

    const recipePaths = response.items.map(item => ({ params: { slug: item.fields.slug } }))

    return {
        paths: recipePaths,
        fallback: false,
    }
}

export const getStaticProps = async({ params }) => {

    const { items } = await client.getEntries({
        content_type: "recipe",
        "fields.slug": params.slug
    });

    return {
        props: {
            recipe: items[0],
        },
    }
}

const RecipeDetails = ({ recipe }) => {
    console.log(recipe);
    const { title, summary, thumbnail, slug, ingredients, dietaryDetails, method } = recipe.fields;

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
                    src={"https:" + thumbnail.fields.file.url}
                    alt={`The ${title} dish shown on a plate cooked`}
                    width={400}
                    height={300}
                    // layout="fill"
                    // objectFit="cover"
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
                <Text textAlign={"justify"}>{summary}</Text>
            </Stack>
            <Stack as="section" my={2} p={4}>
                <Heading as="h3" fontSize={"lg"} textAlign="center">
                    Dietary details:
                </Heading>
                <Flex justifyContent="space-between">
                    <UnorderedList>
                    {dietaryDetails.map((dietMetric) => <ListItem key={dietMetric} listStyleType="none"><ListIcon as={MdCheckCircle} color='green.500' />{dietMetric}</ListItem>)}
                    </UnorderedList>
                </Flex>
            </Stack>
            <Stack as="section" my={2} p={2}>
                <Heading as="h3" fontSize={"lg"} textAlign="center">
                List of ingredients:
                </Heading>
                <UnorderedList stylePosition="inside">
                {ingredients &&
                    ingredients.map((ingredient) => (
                    <ListItem pl={10} py={2} key={ingredient}>{ingredient}</ListItem>
                    ))}
                </UnorderedList>
            </Stack>
             <Center> 
                 <Flex direction={{ base:"column", md: "row"}} justifyContent="space-between" px={10} py={2}> 
                {/* <Button>Start Cooking</Button> */}
                <VerticalStepper method={method} /> 
                </Flex> 
            </Center> 
            </Box>
        </Center>
    )
}

export default RecipeDetails;