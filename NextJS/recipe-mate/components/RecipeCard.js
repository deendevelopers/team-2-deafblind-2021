import Image from "next/image";
import {
    Box,
    Center,
    Heading,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
  } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { addRecipeSlugToUserSavedRecipesSlugs } from "../redux/user/userActions";
import SaveRecipeButton from "./SaveRecipeButton";

const RecipeCard = ({ recipe, isDashboard }) => {
    console.log({recipe});
    const router = useRouter();
    const currentUser = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const { title, summary, thumbnail, slug } = recipe.fields;

    const handleMoreDetailsClick = () => {
        router.push("/recipes/" + slug);
    };

    const handleSaveRecipe = () => {
        console.log("Handle Save Recipe")
        // Save/add recipe slug to redux saved recipes array in current user slice
        dispatch(addRecipeSlugToUserSavedRecipesSlugs({ userId: currentUser.id, recipeSlug: slug }));
    }

    return (
        <Center marginTop={5}>
            <Box
                maxW={"400px"}
                w={"fit-content"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"md"}
                // p={6}
                overflow={"hidden"}
            >
                <Image
                    src={"https:" + thumbnail.fields.file.url}
                    alt={`The ${title} dish shown on a plate cooked`}
                    width={400}
                    height={300}
                    // layout="fill"
                    // objectFit="cover"
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
                        {summary}
                    </Text>
                </Stack>
                <Stack>
                    <Flex m={2} justifyContent="space-between">
                        <Button onClick={handleMoreDetailsClick}>More Details</Button>
                        { (currentUser && !isDashboard) && <SaveRecipeButton isCard savedRecipesSlugs={currentUser.savedRecipesSlugs} currentRecipeSlug={slug} handleSaveRecipe={handleSaveRecipe} /> }
                    </Flex>
                </Stack>
            </Box>
        </Center>
    )
}

export default RecipeCard;