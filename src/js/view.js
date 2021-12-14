import icons from '../img/icons.svg';

//This is refactored code that could be used by all views
export default class view {
  _data;
  //recives data from controller
  render(data) {
    //checking for no data, undefined and null data types and if is data but empty array then error will be shown
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    //checking for no data, undefined and null data types and if is data but empty array then error will be shown
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //method for celaring the parent enement
  _clear() {
    this._parentElement.innerHTML = '';
  }

  //spineris, kad gaida bildi:
  renderSpinner() {
    const markup = `
    <div class="spinner">
            <svg>
              <use href="src/img/${icons}#icon-loader"></use>
            </svg>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  //spineris, kad gaida bildi:

  //error handling in recipeView
  renderError(message = this._errorMessege) {
    const markup = `
          <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  //error handling in recipeView

  //succes messege handling in recipeView
  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
  `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  //succes messege handling in recipeView
}
