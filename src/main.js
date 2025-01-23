import { fetchData } from './js/pixabay-api';
import { formResults } from './js/render-functions';

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const searchForm = document.querySelector('.search-form');
const inputText = document.querySelector('.search-form input');
const loader = document.querySelector('.loader');
let lightbox;

searchForm.addEventListener('submit', handleForm);

function handleForm(event) {
  event.preventDefault();
  const inputValue = inputText.value.trim();

  if (inputValue === '') {
    return iziToast.info({
      position: 'topRight',
      title: 'Error',
      message: 'Please enter a search query.',
    });
  }

  showLoader();

  fetchData(inputValue)
    .then(res => {
      if (res && res.length > 0) {
        formResults(res);
        if (lightbox) {
          lightbox.refresh();
        } else {
          lightbox = new SimpleLightbox('.gallery-item a', {
            captionsData: 'alt',
            captionDelay: 250,
          });
        }
      }
    })
    .catch(error => {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: 'An error occurred. Please try again!',
        backgroundColor: '#FFFF00',
      });
    })
    .finally(() => {
      hideLoader();
      searchForm.reset();
    });
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

// JavaScript for animated placeholder in input

const inputField = document.querySelector('.search-form input');
const placeholderTexts = [
  'Search images...',
  'car',
  'cat',
  'room',
  'books',
  'forest',
  'garden',
  'space',
];
let currentIndex = 0;
let intervalId;

function updatePlaceholder() {
  inputField.setAttribute('placeholder', placeholderTexts[currentIndex]);
  currentIndex = (currentIndex + 1) % placeholderTexts.length;
}

function startPlaceholderAnimation() {
  intervalId = setInterval(updatePlaceholder, 2000);
}

function stopPlaceholderAnimation() {
  clearInterval(intervalId);
}

// Stop animation when the input is focused
inputField.addEventListener('focus', stopPlaceholderAnimation);

// Restart animation when the input loses focus
inputField.addEventListener('blur', startPlaceholderAnimation);

// Initialize the first placeholder text and start animation
updatePlaceholder();
startPlaceholderAnimation();
