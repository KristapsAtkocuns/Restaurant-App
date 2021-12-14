import view from '../view.js';

//Šeit ar .. paiet vienu soli atpakal uz src folder, un tad no tas vietas var doties uz adresi img/icons.svg. Ja nē viņš izmantoja failus no orģinālā js faila, bet mums vajag lai nemtu no dist direktorijas
import icons from 'url:../../img/icons.svg';

//Šeit tiek importets arejains API, kas bus atbildigs par to ka receptes nebus rakstits daudzums ar 0.5 bet gan 1/2 (npm install fractional)
import { Fraction } from 'fractional';

//We will be useing classes because latter we will have a parent class that will inherit some methods. Each view will have some few properties and methods and classes will meke it easier to implement
class recipeView extends view {
  _parentElement = document.querySelector('.recipe');
  _errorMessege = `We could not find the recipe!`;
  _message = '';

  //Event Handlers in MVC: Publisher-suscriber pattern + controller.js
  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  //Event Handlers in MVC: Publisher-suscriber pattern + controller.js

  //Servings count
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      console.log(btn);
      const updateTo = +btn.dataset.updateTo;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  //Servings count

  //data for ${} will come form #data
  _generateMarkup() {
    return `<figure class="recipe__fig">
  <img src="${this._data.image_url}"alt ="${
      this._data.title
    }" class="recipe__img" />
  <h1 class="recipe__title">
    <span>${this._data.title}</span>
  </h1>
</figure>

<div class="recipe__details">
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-clock"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--minutes">${
      this._data.cookingTime
    }</span>
    <span class="recipe__info-text">minutes</span>
  </div>
  <div class="recipe__info">
    <svg class="recipe__info-icon">
      <use href="${icons}#icon-users"></use>
    </svg>
    <span class="recipe__info-data recipe__info-data--people">${
      this._data.servings
    }</span>
    <span class="recipe__info-text">servings</span>

    <div class="recipe__info-buttons">
      <button class="btn--tiny btn--update-servings" data-update-to="${
        this._data.servings - 1
      }">
        <svg>
          <use href="${icons}#icon-minus-circle"></use>
        </svg>
      </button>
      <button class="btn--tiny btn--update-servings" data-update-to="${
        this._data.servings + 1
      }">
        <svg>
          <use href="${icons}#icon-plus-circle"></use>
        </svg>
      </button>
    </div>
  </div>

  <div class="recipe__user-generated">
    
  </div>
  <button class="btn--round">
    <svg class="">
      <use href="${icons}#icon-bookmark-fill"></use>
    </svg>
  </button>
</div>

<div class="recipe__ingredients">
  <h2 class="heading--2">Recipe ingredients</h2>
  <ul class="recipe__ingredient-list">
  ${this._data.ingredients.map(this._generateMarkupIngredient).join('')} 

</div>

<div class="recipe__directions">
  <h2 class="heading--2">How to cook it</h2>
  <p class="recipe__directions-text">
    This recipe was carefully designed and tested by
    <span class="recipe__publisher">${
      this._data.publisher
    }</span>. Please check out
    directions at their website.
  </p>
  <a
    class="btn--small recipe__btn"
    href="${this._data.sourceUrl}"
  >
    <span>Directions</span>
    <svg class="search__icon">
      <use href="src/img/icons.svg#icon-arrow-right"></use>
    </svg>
  </a>
</div>`;
  }

  _generateMarkupIngredient(ing) {
    return `
  <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="src/img/icons.svg#icon-check"></use>
      </svg>
          <div class="recipe__quantity">${
            ing.quantity ? new Fraction(ing.quantity).toString() : ''
          }</div>
          <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
      ${ing.description}
    </div>
  </li>
  `;
  }
}

//Šeit mēs uztaisam tā, lai no ārpuses neviens šeit neko nevarētu izmainīt
export default new recipeView();
