import React, {useState, useEffect} from "react";
import Register from "../../components/register/Register";
import LogIn from "../../components/log-in/Login";
import Header from "../../components/header/Header";
// import "./SignInPage.scss";
import {
  Box,
  Flex,
  Center,
  Button,
  Image
} from '@chakra-ui/react';
import { useHistory } from "react-router";
import ChakraCustomButton from "../../components/chakra-custom-button/ChakraCustomButton";
const SignInPage = () => {
  const history = useHistory();

  return (
    <React.Fragment>
      <main className="signinpage-main">
        <Box m={10} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Header title="Welcome to the Recipe Mate" />
          <Flex direction="column">
              <Image src='https://s3.us-west-2.amazonaws.com/secure.notion-static.com/87f10dcd-250a-45e2-a726-014fe2695172/The_Munchies_Family_Style.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211206%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211206T000428Z&X-Amz-Expires=86400&X-Amz-Signature=d9978b5fff6ba32f914fca8fc5ed299702704d1bd23f632adb50ce234c42b7ba&X-Amz-SignedHeaders=host&response-content-disposition=filename %3D"The%2520Munchies%2520Family%2520Style.svg"&x-id=GetObject' alt='Platter of variety of food items such as hotdogs, burgers, salads and drinks layed on a table front.' />

                <ChakraCustomButton onClick={() => history.push("/register")} bg="#285E61" color="#fff">
                  Register
                </ChakraCustomButton>

                <ChakraCustomButton onClick={() => history.push("/login")} border='2px' borderColor='gray.200' bg="white" color="black">
                  Log-in
                </ChakraCustomButton>

          </Flex>
          </Box>
      </main>
    </React.Fragment>
  )
};

export default SignInPage;
