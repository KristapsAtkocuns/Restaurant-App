import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config';
import { getJSON } from './helpers';
//state object that contains recipe. Controller.js will take recipe out from here. When this state object is going to be updated by loadrecipe, then that will also be updateted in controller that imports the state
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

//function for fetching recipe form API. This function will not return anything, all it will do is just change our state object.
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    //formatējam saņemto atbildi no servera - nodzēšot visus _ simbolus
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    console.error(`${err} ****`);
    throw err;
  }
};

///////////////////////////////////////////////Implementing search results
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    //Formatējām to kā izskatīsies no back-end sanemtie dati console log, to visu saglabajam: state.search.results!
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    console.log(state.search.results);
  } catch (err) {
    console.error(`${err} ****`);
    throw err;
  }
};
loadSearchResults('pizza');
///////////////////////////////////////////////Implementing search results

/////////////////ieviešam to, ka vienā lapā būs parādīti tikai 10 meklēšanas rezultāti receptēm
export const getSearchResultsPage = function (page = state.search.page) {
  //defult page = state.search.page vienmer saks ar 1 lpp
  state.search.page = page; //To know at what page we are

  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9;
  return state.search.results.slice(start, end);
};
/////////////////ieviešam to, ka vienā lapā būs parādīti tikai 10 meklēšanas rezultāti receptēm

//////////////Updating recipe servings
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    //newQt=oldQt * newServings / oldServings // 2 * 8 / 4 = 4
  });
  state.recipe.servings = newServings;
};
//////////////Updating recipe servings
