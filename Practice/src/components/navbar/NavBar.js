import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import { useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import {
  Box,
  Flex,
  Spacer,
  Button,
  Text,
  Heading,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";

export default function NavBar() {
  const currentUser = useSelector((state) => state.user.currentUser);

  const UserIcon = (props) => <Icon as={AiOutlineUser} />;
  return (
    <>
      <Box w="100%" bg="green.100" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* <HStack spacing={9} alignItems={"center"}> */}
          <Link to="/">
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Box pr="4" fontSize="lg">
                &#127812;{" "}
              </Box>
              <Spacer />
              <Box>
                <Text fontSize="2xl" fontWeight="bold" color="green.900">
                  Recipe Mate
                </Text>
              </Box>
            </Flex>
          </Link>
          {/* </HStack> */}
          <Flex alignItems={"center"}>
            {currentUser ? (
              <Button
                variant={"solid"}
                bg="#fff"
                color="#2D3748"
                size={"lg"}
                mr={4}
                rightIcon={<UserIcon />}
              >
                Profile
              </Button>
            ) : (
              <Button
                variant={"solid"}
                bg="#fff"
                color="#2D3748"
                size={"lg"}
                mr={4}
                rightIcon={<UserIcon />}
              >
                Sign-In
              </Button>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

// const NavBar = () => {
//     const currentUser = useSelector(state => state.user.currentUser);

//     return(
//         <nav className="navbar">
//
//             <ul>
//                 {/* <li><Link to="/">Home</Link></li> */}
//                 <li><a href="/">Home</a></li>
//                 {/* <li><Link to="/random-recipe">Random Recipe</Link></li> */}
//                 { currentUser ?
//                 <li><Link to="/dashboard">Account</Link></li>
//                     :
//                 <li><Link to="/sign-in">Sign-In</Link></li>
//                 }
//             </ ul>
//         </nav>
//     )
// }

// export default NavBar;
