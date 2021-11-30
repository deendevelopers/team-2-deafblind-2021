import React from "react";

const RecipeArticle = ({ title, summary, cookingTime, imageUrl, ingredients, instructions, dietInfo }) => (
    title ? 
        <article>
            <header>
                <h2>{title}</h2>
                <aside>
                    <img src={imageUrl} alt={`The ${title} dish shown on a plate cooked`} />
                    <div>
                        <p>{summary.replace(/(<([^>]+)>)/gi, "")}</p>
                        <p>Time to cook: {cookingTime} minutes</p>
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
                        {ingredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
                    </ul>
                </section>
            </div>
            <section>
                <h3>Cooking instructions:</h3>
                <ol>
                    {instructions.map(instruction => <li key={instruction.number}>{ instruction.step }</li>)}
                </ol>
            </section>
        </article> : <h2 className="starting-instruction">Please click on the button to find yourself a random recipe to make today!</h2>
    
);

export default RecipeArticle;