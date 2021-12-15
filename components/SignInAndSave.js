import { useDispatch } from "react-redux";
import { saveRecipeWithSignIn } from "../redux/user/userActions";
import ChakraCustomButton from "./ChakraCustomButton";
import { Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

const SignInAndSave = ({ recipeSlug }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleSignInAndSave = () => {
        dispatch(saveRecipeWithSignIn(recipeSlug));
        router.push("/sign-in")
    }

    return (
        <Flex direction={{ base: "column", md: "row" }} alignItems="center" justifyContent="center">
            <Heading as="h3" fontSize="2xl">Sign-in and save this recipe</Heading>
            <ChakraCustomButton onClick={handleSignInAndSave}>Sign-in and save</ChakraCustomButton>
        </Flex>
    )
}

export default SignInAndSave;