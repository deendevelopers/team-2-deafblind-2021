import {
    Box, 
    Center,
    Button
  } from '@chakra-ui/react';

const ChakraCustomButton = ({ children, ...otherProps }) => (
    <Button
        { ...otherProps }
        size="md"
        fontSize="xl"
        m={{ base: 0, md: 4 }}
        p={3}
        h="100%"
        _active={{
            bg: "teal.700",
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
        }}
        _hover={{
            bg: "teal.600",
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
        }}
        >
            {children}
    </Button>
)

export default ChakraCustomButton;