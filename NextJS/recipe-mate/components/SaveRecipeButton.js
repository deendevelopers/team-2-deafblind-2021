import { useRouter } from "next/router";
import ChakraCustomButton from "./ChakraCustomButton";
import { CheckIcon } from "@chakra-ui/icons";
import { Flex, Text, Center } from "@chakra-ui/react";

const SaveRecipeButton = ({ handleSaveRecipe, savedRecipesSlugs, currentRecipeSlug, isCard }) => {
    const router = useRouter();
    console.log({savedRecipesSlugs});
    const showButton = savedRecipesSlugs && !savedRecipesSlugs.includes(currentRecipeSlug);

    if (showButton === undefined) return <></>;
    return (
        showButton ? <ChakraCustomButton onClick={handleSaveRecipe}>Save Recipe</ChakraCustomButton>
            :
        (isCard ? <Flex alignItems="center"><CheckIcon color="green" /><Text color="green">Already saved</Text></Flex>
            : (
            <Center as="aside" gap={3} mb={{base: 4, md: 0}}>
                <Text color="green.800" fontWeight="bold" fontSize={"md"} textAlign={"center"}>Recipe already saved</Text>
                <ChakraCustomButton onClick={() => router.push("/dashboard")}>Dashboard</ChakraCustomButton>
            </Center>
            )
        )    
    )
}

export default SaveRecipeButton;