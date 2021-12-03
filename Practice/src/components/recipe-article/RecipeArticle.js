import React from "react";
import { getUniqueIngredients } from "../../components/random-search/helperFunctions";

const RecipeArticle = ({ currentRecipe: { title, summary, image, readyInMinutes, vegan, vegetarian, glutenFree, diaryFree, extendedIngredients, analyzedInstructions: [{ steps }] } }) => {
    // console.log(title, extendedIngredients);

    const dietInfo = {
        vegetarian: vegetarian ? "Yes": "No",
        vegan: vegan ? "Yes": "No",
        glutenFree: glutenFree ? "Yes": "No",
        diaryFree: diaryFree ? "Yes": "No"
    }

    const uniqueIngredients = getUniqueIngredients(extendedIngredients);

    return(
        title ? 
            <article>
                <header>
                    <h2>{title}</h2>
                    <aside>
                      <img src={image} alt={`The ${title} dish shown on a plate cooked`} />
                      <div>
                          <p>{summary.replace(/(<([^>]+)>)/gi, "")}</p>
                          <p>Time to cook: {readyInMinutes} minutes</p>
                      </div>
                  </aside>
                 </header>
                 <div className="diet-ingredients-container">
                    <section>
                        <h3>Dietary details:</h3>
                        {Object.keys(dietInfo).map(dietMetric => <p key={dietMetric}>{dietMetric}: {dietInfo[dietMetric]}</p>)}
                    </section>
                    <section>
                        <h3>List of ingredients:</h3>
                        <ul>
                            { extendedIngredients && uniqueIngredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
                        </ul>
                    </section>
                </div>
                <section>
                    <h3>Cooking instructions:</h3>
                    <ol>
                        {steps.map(instruction => <li key={instruction.number}>{ instruction.step }</li>)}
                    </ol>
                </section>
             </article> : <h2 className="starting-instruction">Please click on the button to find yourself a random recipe to make today!</h2>
        
    )
};

export default RecipeArticle;
