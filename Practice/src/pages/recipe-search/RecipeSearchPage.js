import React, { useEffect, useState } from "react";
import RecipeSearch from "../../components/recipe-search/RecipeSearch";
import "./RecipeSearchPage";
import axios from "axios";

const API_KEY = "1fae167ef83a4a56b244effeb1a158ec";

const RecipeSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async (ingredient) => {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&ingredients=apples`
      );
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    };
    setSearchTerm(searchTerm);
  }, [searchTerm]);

  return (
    <section>
      <RecipeSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <article></article>
    </section>
  );
};

export default RecipeSearchPage;
