import { Box, Flex, Text, Icon, Button } from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const UserIcon = (props) => <Icon as={AiOutlineUser} />;

    return (
        <Flex as="nav" bg="green.100" w="100%" alignItems={"center"} justifyContent={"space-between"} p={[5, 3]} >
            <Link href="/">
                <a>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize={{ base: "1.4rem", md: "2xl"}} fontWeight="bold" color="green.900">
                            Recipe Mate
                        </Text>
                    </Flex>
                </a>
            </Link>
            <Flex alignItems={"center"}>
            {currentUser ? (
                <Link href="/dashboard">
                    <a>
                        <Button
                        variant={"solid"}
                        bg="#fff"
                        color="#2D3748"
                        size={"lg"}
                        rightIcon={<UserIcon />}
                        >
                            Account
                        </Button>
                    </a>
                </Link>
            ) : (
                <Link href="/sign-in">
                    <a>
                        <Button
                        variant={"solid"}
                        bg="#fff"
                        color="#2D3748"
                        size={"lg"}
                        rightIcon={<UserIcon />}
                        >
                            Sign-In
                        </Button>
                    </a>
                </Link>
            )}
          </Flex>

        </Flex>
    )
}

export default Navbar;