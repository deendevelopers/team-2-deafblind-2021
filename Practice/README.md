# Accessibile React App

- Random Recipe Generator using the spoonacular API
- Semantic HTML example - see the [Recipe Article Component](https://github.com/deendevelopers/team-2-deafblind-2021/blob/practice/Practice/src/components/recipe-article/RecipeArticle.js)

## Packages

- React (only functional components used with Hooks)

- Firebase 
    - Authentication
    - Firestore database for storage of user saved recipes, recipe details, etc.

- Redux for state management 
    - Redux-Thunk 
    - Redux Dev Tools (and Redux-Logger likewise) for development debugging 

- SASS for styling of app

- React-Router for managing routing in the single page application

- Axios for http requests

- React-select package was being used initially as it provided many great features such as multiselect, searching facility and many others. Unfortunately the dropdown menu provided with certain difficulties related to accessibility such as inability to open the dropdown menu when using windows narrator and the keyboard up/down/left/right keys. For this reason decision was taken to rewrite the select dropdowns with native html inputs. 

## Pseudo-Testing 

- Using windows narrator with the keyboard arrow keys to see how easily a user can toggle and navigate through the website.

## Deployment

This React project has been deployed using Netlify to https://recipe-mate.netlify.app.
