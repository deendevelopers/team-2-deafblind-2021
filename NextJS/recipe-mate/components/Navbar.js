import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";

const Navbar = () => {
    return (
        <Flex as="nav" bg="green.100" w="100%" alignItems={"center"} justifyContent={"space-between"} p={[5, 3]} >
            <Link href="/">
                <a>
                    <Flex justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize="2xl" fontWeight="bold" color="green.900">
                            Recipe Mate
                        </Text>
                    </Flex>
                </a>
            </Link>
        </Flex>
    )
}

export default Navbar;