///////////////imports from model.js
import * as model from './model.js';
///////////////imports from model.js
///////////////imports from recipeView
import recipeViews from './views/recipeViews.js';
///////////////imports from recipeView

///////////////imports from recipeView
import searchView from './searchView.js';

import resultsView from './resultsView.js';

import paginationView from './views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';
///////////////imports from recipeView

//Hot module reloading - comming from parcel
// if (module.hot) {
//   module.hot.accept();
// }

// const recipeContainer = document.querySelector('.recipe');

//<-- Src/sass is advanced css, that will be converted with parcel for use in older systems

// 1) nmp inint (initializing new project - will create package.jason file), kad fails ir radīts, to modificē attiecīgi projektam (main, scripts utt.)
// 2) npm i parcel@next -D (Uzinstale parcel)
// 3) npm install
// 4) npm start (creates nodes-modules folder, dist)

const { allTargets } = require('node-abi');
const { async } = require('regenerator-runtime');

//Makeing shore old browsers support our applincation (npm i core-js regenerator-runtime)
import 'core-js/stable'; //polifilling everything else
import 'regenerator-runtime/runtime'; //polifilling single wait

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//Izsaucam pirmo IPA ar recepti
const controlRecipes = async function () {
  //error menaging
  try {
    //Šeit
    const id = window.location.hash.slice(1);
    // console.log(id);
    //Gadijumā ja nav ID
    if (!id) return;
    /////////////////////////////////// 3) Render spinner
    recipeViews.renderSpinner();
    //rendering spinner
    //Izsaucam Jonas radito API
    //rendering spinner - tiek ielikts recipeContainer
    /////////////////////////////////// 3) Render spinner

    /////////////////////////////////// 1) Loading recipe
    await model.loadRecipe(id); //await, because async function will always return promise. Also know that this function is not returning anything, so there is no need to store any result in any new variable, but what we have here is the access to state recipe!

    /////////////////////////////////// 1) Loading recipe

    //////////////////////////////////// 2) Rendering recipe
    //Šeit tiek pateikt, ka recepte no model view tiks atspogulota recipe container caru recipeViews
    recipeViews.render(model.state.recipe);

    contorlServings();
  } catch (err) {
    recipeViews.renderError();
  }
};

//Search results implementation
const controlSearchResults = async function () {
  try {
    //Display spinner
    resultsView.renderSpinner();
    //1) Get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2) Load search results
    await model.loadSearchResults(query);
    //3) Render search results
    resultsView.render(model.getSearchResultsPage());
    // console.log(model.state.search.results);
    //4) Render initial pagintation buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResults();
//Search results implementation

//ieviešam to ka pogu spiežot mainīsies recepšu logs, uz nākošajām 10 receptēm
const controlPagination = function (goToPage) {
  console.log(goToPage);

  //1) Render NEW search results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //2) Render NEW initial pagintation buttons
  paginationView.render(model.state.search);
};

//////////////Updating recipe servings
const contorlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);
  //Update the recipe view
  recipeViews.render(model.state.recipe);
};
//////////////Updating recipe servings

//Event Handlers in MVC: Publisher-suscriber pattern + recipeVievs.js
const init = function () {
  recipeViews.addHandlerRender(controlRecipes);
  recipeViews.addHandlerUpdateServings(contorlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHanlerClick(controlPagination);
};
init();
//Event Handlers in MVC: Publisher-suscriber pattern + recipeVievs.js

//Klausīties notikumu, kura user uzklikšķina uz receptes, kad tas notiek, tad # linku (HTML) sameklet atbilstošo recepti un to ar controlRecipes attalot lapa. + load event, kad vienkarsi grib nokopet linku

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);

//React, Angular ext. var izmantot web arhitekturas ieviešanai. Ir svarigi ieviest labu arhitekturu, lai varetu organizet kodu, mainit to nakotne un pievienot jaunas funkcijas.
