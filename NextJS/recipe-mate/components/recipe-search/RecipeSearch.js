import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Button, Center } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../../redux/recipes/recipesActions";
import { filterRecipes } from "./recipeSearchUtils";
import AdvancedSearch from "../advanced-search/AdvancedSearch";

const RecipeSearch = ({ recipes }) => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
    const [ advancedSearchQueries, setAdvancedSearchQueries ] = useState({
        dietTerm: [],
        allergiesTerm: [],
        mealTypesTerm: [],
    })

    const handleSearch = () => {
        console.log({ searchTerm, advancedSearchQueries });
        const matchedRecipes = filterRecipes({ searchTerm, recipes, dietTerm: advancedSearchQueries.dietTerm, allergiesTerm: advancedSearchQueries.allergiesTerm, mealTypesTerm: advancedSearchQueries.mealTypesTerm });
        console.log(matchedRecipes);
        dispatch(setSearchResults(matchedRecipes));
        setAdvancedSearchQueries({
            dietTerm: [],
            allergiesTerm: [],
            mealTypesTerm: [],
        });
    }

    const handleAdvancedSearchChange = (event) => {
        const { name, value } = event.target;
        console.log({ name, value });
        setAdvancedSearchQueries(exisitingState => {
            if(exisitingState[name].includes(value)){
                return {
                    ...exisitingState,
                    [name]: exisitingState[name].filter(term => term !== value)
                }
            }
            return {
                ...exisitingState,
                [name]: [...exisitingState[name], value]
            }
        })
    }

    return (
        <React.Fragment>
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
            {!showAdvancedSearch && (
                <Center my={3}>
                <Button onClick={() => setShowAdvancedSearch(true)}>
                    Advanced Search
                </Button>
                </Center>
            )}
            {showAdvancedSearch && <AdvancedSearch dietTerm={advancedSearchQueries.dietTerm} allergiesTerm={advancedSearchQueries.allergiesTerm} mealTypesTerm={advancedSearchQueries.mealTypesTerm} handleAdvancedSearchChange={handleAdvancedSearchChange} setShowAdvancedSearch={setShowAdvancedSearch} /> }
        </ React.Fragment>
    )
}

export default RecipeSearch;