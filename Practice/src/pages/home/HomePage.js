import React from "react";
import Header from "../../components/header/Header";
import "./HomePage.scss";

const HomePage = ({ history }) => (
    <React.Fragment>
        <Header title="Welcome to the Recipe Mate" message="We hope you have an amazing cooking experience together!" />
        {/* <div>
            Click here to go to the recipe search page where you can search for recipes with your desired ingredients list
            <button onClick={() => history.push("./recipe-search")} >Recipe Search</button>
        </div> */}
        <section className="homepage-section">
            <h2>Click here to go to be a bit adventurous and search for a random recipe!</h2>
            <button onClick={() => history.push("./random-recipe")} >Random Recipe Generator</button>
        </section>
    </ React.Fragment>
)

export default HomePage;