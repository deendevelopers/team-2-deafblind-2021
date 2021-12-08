import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { Box, Flex, Button, Text, Icon } from "@chakra-ui/react";

export default function NavBar() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const UserIcon = (props) => <Icon as={AiOutlineUser} />;
  return (
    <>
      <Box w="100%" bg="green.100" px={4} position={"sticky"} top={"0"} z-index={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* <HStack spacing={9} alignItems={"center"}> */}
          <Link to="/">
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="green.900">
                  Recipe Mate
                </Text>
              </Box>
            </Flex>
          </Link>

          <Flex alignItems={"center"}>
            {currentUser ? (
              <Link to="/dashboard">
                <Button
                  variant={"solid"}
                  bg="#fff"
                  color="#2D3748"
                  size={"lg"}
                  rightIcon={<UserIcon />}
                >
                  Profile
                </Button>
              </Link>
            ) : (
              <Link to="/sign-in">
                <Button
                  variant={"solid"}
                  bg="#fff"
                  color="#2D3748"
                  size={"lg"}
                  rightIcon={<UserIcon />}
                >
                  Sign-In
                </Button>
              </Link>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
