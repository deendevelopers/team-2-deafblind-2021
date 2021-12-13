import Image from "next/image";
import {
    Box,
    Center,
    Heading,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
  } from "@chakra-ui/react";
import { useRouter } from "next/router";

const RecipeCard = ({ recipe }) => {
    console.log({recipe});
    const router = useRouter();

    const { title, summary, thumbnail, slug } = recipe.fields;

    const handleMoreDetailsClick = () => {
        router.push("/recipes/" + slug);
    };
    return (
        <Center marginTop={5}>
            <Box
                maxW={"400px"}
                w={"fit-content"}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                rounded={"md"}
                // p={6}
                overflow={"hidden"}
            >
                <Image
                    src={"https:" + thumbnail.fields.file.url}
                    alt={`The ${title} dish shown on a plate cooked`}
                    width={400}
                    height={300}
                    // layout="fill"
                    // objectFit="cover"
                />
                <Stack p={4}>
                    <Heading
                        color={useColorModeValue("gray.700", "white")}
                        fontSize={"xl"}
                        fontFamily={"body"}
                        noOfLines={1}
                    >
                        {title}
                    </Heading>
                    <Text color={"gray.500"} noOfLines={2}>
                        {summary}
                    </Text>
                </Stack>
                <Button onClick={handleMoreDetailsClick}>More Details</Button>
            </Box>
        </Center>
    )
}

export default RecipeCard;