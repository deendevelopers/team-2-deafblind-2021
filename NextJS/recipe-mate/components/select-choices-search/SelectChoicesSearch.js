import { useDispatch } from "react-redux";
import { Grid } from '@chakra-ui/react'
import SelectChoicesButtonContainer from "./SelectChoicesButtonContainer";
import { setSearchResults } from "../../redux/recipes/recipesActions";
import { filterRecipesBySelection } from "./selectSearchUtils";

const SelectChoicesSearch = ({ recipes }) => {
    const dispatch = useDispatch();

    const handleClick = ({ target: { name } }) => {
        const filteredRecipes = filterRecipesBySelection({ recipes, selection: name });
        console.log(filteredRecipes)
        dispatch(setSearchResults(filteredRecipes));
    }

    return (
        <Grid as="section" templateColumns='repeat(3, 1fr)' gap={3} marginTop={5} p={8}>
            <SelectChoicesButtonContainer 
                name={"indian"} title={"Indian"} boxBg={"orange.200"} handleClick={handleClick}
                imageUrl={`/select-choices-images/IndianCuisineOption.svg`} 
                imageAlt={"Cartoon like illustrations of kebabs on skewers."}
            />
            <SelectChoicesButtonContainer 
                name={"salad"} title={"Salad"} boxBg={"yellow.300"} handleClick={handleClick}
                imageUrl={`/select-choices-images/SaladOption.svg`} 
                imageAlt={"Cartoon like illustrations of a salad consisting of a variety of greens in a bowl."}
            />
            <SelectChoicesButtonContainer 
                name={"dessert"} title={"Sweet"} boxBg={"orange.200"} handleClick={handleClick}
                imageUrl={`/select-choices-images/SweetOption.svg`} 
                imageAlt={"Cartoon like illustrations of a chocolate cake with a cherry on top."}
            />
            <SelectChoicesButtonContainer 
                name={"easy"} title={"Easy"} boxBg={"yellow.300"} handleClick={handleClick}
                imageUrl={`/select-choices-images/BurgerEasyOption.svg`} 
                imageAlt={"Cartoon like illustrations of a cheeseburger with some lettuce sandwiched between the patties."}
            />
            <SelectChoicesButtonContainer 
                name={"oven"} title={"Oven"} boxBg={"orange.200"} handleClick={handleClick}
                imageUrl={`/select-choices-images/PizzaOvenOption.svg`} 
                imageAlt={"Cartoon like illustrations of a pizza slice."}
            />
            <SelectChoicesButtonContainer 
                name={"vegetarian"} title={"Veggie"} boxBg={"yellow.300"} handleClick={handleClick}
                imageUrl={`/select-choices-images/VeggieOption.svg`} 
                imageAlt={"Cartoon like illustrations of two sushi pieces."}
            />
        </Grid>
    )
}

export default SelectChoicesSearch;