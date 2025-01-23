import iziToast from 'izitoast';

const API_KEY = '48292136-dc008af678147f60b21a3f0d6';
const API_URL = 'https://pixabay.com/api/';

export function fetchData(inputValue) {
  const options = new URLSearchParams({
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 21,
  });

  const urlWithParams = `${API_URL}?${options.toString()}`;

  return fetch(urlWithParams)
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to fetch images.');
      }
      return res.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'No Results',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          titleColor: '#000000',
          messageColor: '#000000',
          position: 'topRight',
          backgroundColor: '#FFFF00',
        });
        return [];
      }
      return data.hits;
    })
    .catch(err => {
      iziToast.error({
        title: 'Error',
        message: 'An error occurred while fetching data.',
        titleColor: '#000000',
        messageColor: '#000000',
        position: 'topRight',
        backgroundColor: '#FFFF00',
      });
    });
}
