import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import { useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import {
  Box,
  Flex,
  Spacer,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Heading,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";

const Links = ["Dashboard", "Projects", "Team"];

export default function NavBar() {
  const UserIcon = (props) => <Icon as={AiOutlineUser} />;
  return (
    <>
      <Box w="100%" bg={useColorModeValue("gray.100", "gray.900")} px={2}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* <HStack spacing={9} alignItems={"center"}> */}
          <Link to="/">
            <Flex justifyContent={"space-between"}>
              <Box pr="4">&#127812; </Box>
              <Spacer />
              <Heading size="md">Recipe Mate</Heading>
            </Flex>
          </Link>
          {/* </HStack> */}
          <Flex alignItems={"center"}>
            <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              mr={4}
              rightIcon={<UserIcon />}
            >
              Profile
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
