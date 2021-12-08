import React from "react";
import Header from "../../components/header/Header";
import {
  Box,
  Flex,
  Image
} from '@chakra-ui/react';
import { useHistory } from "react-router";
import ChakraCustomButton from "../../components/chakra-custom-button/ChakraCustomButton";
const SignInPage = () => {
  const history = useHistory();

  return (
      <main>
        <Box m={10} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Header title="Welcome to the Recipe Mate" />
          <Flex direction="column">
              <Image src='/assets/SignInPagePlatter.svg' />

                <ChakraCustomButton onClick={() => history.push("/register")} bg="#285E61" color="#fff">
                  Register
                </ChakraCustomButton>

                <ChakraCustomButton onClick={() => history.push("/login")} border='2px' borderColor='gray.200' bg="white" color="black">
                  Log-in
                </ChakraCustomButton>

          </Flex>
          </Box>
      </main>
  )
};

export default SignInPage;
