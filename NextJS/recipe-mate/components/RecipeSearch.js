import { useState } from "react";
import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

const RecipeSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        console.log(searchTerm);
    }

    return (
        <InputGroup mt={4} bg="#fffgit">
            <Input
                size="lg"
                type="text"
                bg="#fff"
                placeholder="Find a recipe"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <InputRightElement width="4.5rem" h="100%">
                <Button
                    size="lg"
                    borderLeftRadius="0"
                    bg="#285E61"
                    color="#fff"
                    h="100%"
                    onClick={handleSearch}
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
                    Search
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}

export default RecipeSearch;