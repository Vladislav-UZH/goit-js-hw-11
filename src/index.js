import debounce from 'lodash.debounce';
import './css/styles.css';
import { Notify } from 'notiflix';
import onFetchData from './fetch-api';
const DEBOUNCE_DELAY = 300;

// Notiflix
const refs = {
  inputEl: document.querySelector('#search-box'),
  searchCountryListEl: document.querySelector('.country-list'),
  searchCountryInfoEl: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onEntering, DEBOUNCE_DELAY));
function onEntering(e) {
  const inputValue = e.target.value.trim();
  refs.searchCountryListEl.innerHTML = '';
  refs.searchCountryInfoEl.innerHTML = '';
  console.log(!inputValue);
 if (!inputValue) {
        return;
      }
  onFetchData(inputValue)
    .then(data => {
      
        if (!data) {
        
        return;
      }
        checkArrLength(data);
        
    })
    .catch(err => {
      onFailGetNotify(err);
    });
}



function checkArrLength(countriesDataArr) {
  if (countriesDataArr.length > 10) {
    return Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countriesDataArr.length > 1 && countriesDataArr.length < 10  ) {
     refs.searchCountryListEl.innerHTML = createCountryListMarkup(countriesDataArr);
  } else {
     return refs.searchCountryInfoEl.innerHTML = createCountryInfoMarkup(countriesDataArr);
   }
}

function onFailGetNotify(err) {
(document.querySelector('.country-info')).style.padding = "0px";
  Notify.failure('Oops, there is no country with that name');
  return console.error(err);
}
function createCountryListMarkup(data) {
    const markup = data
    .map(
      ({ flags: { svg }, name: { official } }) => `
    <li class="country-list__item"><img src="${svg}" width="35px" height="auto" alt="flag of ${official} "><span>${official}</span></li>`
    )
        .join('');
    return markup;
}
function createCountryInfoMarkup(data) {
   const markup = data
    .map(
        ({ capital, population, languages , flags: { svg }, name: { official }  }) => `<ul class="contry-info__list">
      <li class="contry-info__item">
        <img src="${svg}" width="35px" height="auto" alt="flag of ${official} ">
        <span class="country-info__value">${official};</span>
      </li>
      <li class="contry-info__item">
        <p class="contry-info__title">Capital:</p>
        <span class="country-info__value">${capital};</span>
      </li>
      <li class="contry-info__item">
        <p class="contry-info__title">Population:</p>
        <span class="country-info__value">${population};</span>
      </li>
      <li class="contry-info__item">
        <p class="contry-info__title">Languages:</p>
        <span class="country-info__value">${Object.values(languages)};</span>
      </li>
    </ul>`
    )
       .join('');
    (document.querySelector('.country-info')).style.padding = '20px';
    return markup;
}
