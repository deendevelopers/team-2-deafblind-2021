import { Center, Box, Button } from '@chakra-ui/react';
import Image from 'next/image';

const SelectButtonContainer = ({ name, title, imageUrl, imageAlt, boxBg, handleClick }) => (
    <Box as="article" bg={boxBg} p={1} borderRadius={15} display={"flex"} flexDirection={"column"} justifyContent={"flex-end"}>
        <Center>
            <Image
                src={imageUrl}
                alt={imageAlt}
                width={100}
                height={100}
                // layout="responsive"
            />
        </Center>
        <Button name={name} onClick={handleClick} bgColor={"transparent"}>
            {title}
        </Button>
    </Box>
)

export default SelectButtonContainer;