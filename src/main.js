import { fetchData } from './js/pixabay-api';
import { formResults } from './js/render-functions';

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';

const searchForm = document.querySelector('.search-form');
const inputText = document.querySelector('.search-form input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.createElement('button');

loadMoreBtn.className = 'load-more-btn';
loadMoreBtn.textContent = 'Load more';
loadMoreBtn.style.display = 'none';
document.querySelector('.gallery-container').appendChild(loadMoreBtn);

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

const lightbox = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', handleForm);

async function handleForm(event) {
  event.preventDefault();
  const inputValue = inputText.value.trim();

  if (inputValue === '') {
    return iziToast.info({
      position: 'topRight',
      title: 'Error',
      message: 'Please enter a search query.',
    });
  }

  currentQuery = inputValue;
  currentPage = 1;
  clearGallery();
  toggleLoader(true);
  loadMoreBtn.style.display = 'none';

  try {
    const { images, totalHits: hits } = await fetchData(
      currentQuery,
      currentPage
    );
    totalHits = hits;

    if (images.length > 0) {
      formResults(images);
      lightbox.refresh();
      toggleLoadMoreBtn(images.length);
    } else {
      iziToast.info({
        position: 'topRight',
        title: 'No Results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        titleColor: '#000000',
        messageColor: '#000000',
        backgroundColor: '#FFFF00',
        class: 'result-end',
      });
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: error.message,
      backgroundColor: '#FFFF00',
    });
  } finally {
    toggleLoader(false);
    searchForm.reset();
  }
}

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  toggleLoader(true);
  loadMoreBtn.style.display = 'none';

  try {
    const { images } = await fetchData(currentQuery, currentPage);
    formResults(images);
    lightbox.refresh();
    toggleLoadMoreBtn(images.length);
    smoothScroll();

    if (currentPage * 15 >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        titleColor: '#FFFFFF',
        messageColor: '#FFFFFF',
        backgroundColor: '#7B68EE',
        class: 'result-end',
      });
    }
  } catch (error) {
    iziToast.error({
      position: 'topRight',
      title: 'Error',
      message: error.message,
      backgroundColor: '#FFFF00',
    });
  } finally {
    toggleLoader(false);
  }
});

function toggleLoader(show) {
  loader.style.display = show ? 'block' : 'none';
}

function toggleLoadMoreBtn(count) {
  loadMoreBtn.style.display =
    count > 0 && totalHits > currentPage * 15 ? 'block' : 'none';
}

function clearGallery() {
  document.querySelector('.gallerylist').innerHTML = '';
}

function smoothScroll() {
  const firstCard = document.querySelector('.gallerylist .gallery-item');
  if (!firstCard) return;
  const { height: cardHeight } = firstCard.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// Animated placeholder for search input
const inputField = document.querySelector('.search-form input');
const placeholderTexts = [
  'S',
  'Se',
  'Sea',
  'Sear',
  'Searc',
  'Search ',
  'Search i',
  'Search im',
  'Search ima',
  'Search imag',
  'Search image',
  'Search images',
  'Search images.',
  'Search images..',
  'Search images...',
  'c',
  'ca',
  'cat',
  'b',
  'bo',
  'boo',
  'book',
  'books',
  'r',
  'ro',
  'roo',
  'room',
  'f',
  'fo',
  'for',
  'fore',
  'fores',
  'forest',
  'g',
  'ga',
  'gar',
  'gard',
  'garde',
  'garden',
  's',
  'sp',
  'spac',
  'space',
];
let currentIndex = 0;
let intervalId;

function updatePlaceholder() {
  inputField.setAttribute('placeholder', placeholderTexts[currentIndex]);
  currentIndex = (currentIndex + 1) % placeholderTexts.length;
}

function startPlaceholderAnimation() {
  intervalId = setInterval(updatePlaceholder, 365);
}

function stopPlaceholderAnimation() {
  clearInterval(intervalId);
}

inputField.addEventListener('focus', stopPlaceholderAnimation);
inputField.addEventListener('blur', startPlaceholderAnimation);

updatePlaceholder();
startPlaceholderAnimation();
