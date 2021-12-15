import { Box, Flex, Center } from "@chakra-ui/react";
import { useEffect } from "react";
import ChakraCustomButton from "../../components/ChakraCustomButton";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSelector } from "react-redux";

const SignInPage = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const router = useRouter();

    useEffect(() => {
        if(currentUser) router.replace("/dashboard");
    }, [currentUser]);

  return (
      <Center as="main">
        <Box m={10} borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Flex direction="column">
                <Image 
                    src="/SignInPagePlatter.svg" 
                    alt="Platter of various food items such as cake, hot dog, burger, salad, etc. laid out"
                    width={500}
                    height={400}
                    // layout="responsive"
                />

                <ChakraCustomButton onClick={() => router.push("/sign-in/register")} bg="#285E61" color="#fff">
                  Register
                </ChakraCustomButton>

                <ChakraCustomButton onClick={() => router.push("/sign-in/login")} border='2px' borderColor='gray.200' bg="white" color="black">
                  Log-in
                </ChakraCustomButton>

          </Flex>
          </Box>
      </Center>
  )
};

export default SignInPage;