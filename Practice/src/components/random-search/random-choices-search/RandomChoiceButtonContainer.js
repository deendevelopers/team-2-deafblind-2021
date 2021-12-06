import React from "react";
import { Center, Box, Button, Image } from '@chakra-ui/react';

const RandomChoiceButtonContainer = ({ name, title, imageUrl, imageAlt, boxBg, handleClick }) => (
    <Box bg={boxBg} p={1} borderRadius={15} display={"flex"} flexDirection={"column"} justifyContent={"flex-end"}>
        <Center>
            <Image
                src={imageUrl}
                alt={imageAlt}
            />
        </Center>
        <Button name={name} onClick={handleClick} bgColor={"transparent"}>
            {title}
        </Button>
    </Box>
)

export default RandomChoiceButtonContainer;