import React from "react";
// import { Link } from "react-router-dom";
import "./NavBar.scss";
import { useSelector } from "react-redux";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

const Links = ["Dashboard", "Projects", "Team"];

export default function NavBar() {
  return (
    <>
      <Box w="100%" bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
          </HStack>
          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              leftIcon={<AddIcon />}
            >
              Action
            </Button>
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
//             <div className="logo-container">
//                 <p>&#127812;</p>
//                 <p>Recipe Mate</p>
//             </div>
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
