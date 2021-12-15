import { useRouter } from "next/router";
import ChakraCustomButton from "./ChakraCustomButton";
import { CheckIcon } from "@chakra-ui/icons";
import { Flex, Text } from "@chakra-ui/react";

const SaveRecipeButton = ({ handleSaveRecipe, savedRecipesSlugs, currentRecipeSlug, isCard }) => {
    const router = useRouter();
    const showButton = savedRecipesSlugs && !savedRecipesSlugs.includes(currentRecipeSlug);

    return (
        showButton ? <ChakraCustomButton onClick={handleSaveRecipe}>Save Recipe</ChakraCustomButton>
            :
        (isCard ? <Flex alignItems="center"><CheckIcon color="green" /><Text color="green">Already saved</Text></Flex>
            : (
            <aside className="save-recipe-button-container">
                <Text fontSize={"md"} textAlign={"center"}>This recipe has been saved - please go to your dashboard to view</Text>
                <ChakraCustomButton onClick={() => router.push("/dashboard")}>Dashboard</ChakraCustomButton>
            </aside>
            )
        )    
    )
}

export default SaveRecipeButton;