import React from "react";
import Header from "../../components/header/Header";
import CustomButton from "../../components/custom-button/CustomButton";
import "./HomePage.scss";
import RandomRecipePage from "../random-recipe/RandomRecipePage";

const HomePage = ({ history }) => (
    <div className="background">
    <React.Fragment>
    {/* <div className="background"> */}
        <Header title="WECLOME TO RECIPE MATE"/> 

        <h1 className="slogan">Search it, dish it, plate it! Everyone needs a Recipe Mate</h1>

        {/* <div>
            Click here to go to the recipe search page where you can search for recipes with your desired ingredients list
            <button onClick={() => history.push("./recipe-search")} >Recipe Search</button>
        </div> */}
        <section className="homepage-section">
            <h2>Click here to go to be a bit adventurous and search for a random recipe!</h2>
            <RandomRecipePage />
            {/* <CustomButton onClick={() => history.push("./random-recipe")} >Random Recipe Generator</CustomButton> */}
        </section>
    </ React.Fragment>
    </div>
)

export default HomePage;