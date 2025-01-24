import axios from 'axios';
import iziToast from 'izitoast';

const API_KEY = '48292136-dc008af678147f60b21a3f0d6';
const API_URL = 'https://pixabay.com/api/';

export async function fetchData(inputValue, page = 1, perPage = 15) {
  try {
    const params = {
      key: API_KEY,
      q: inputValue,
      image_type: 'photo',
      titleColor: '#000000',
      messageColor: '#000000',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page,
    };

    const { data } = await axios.get(API_URL, { params });

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No Results',
        message: 'No images match your query. Please try again.',
        titleColor: '#000000',
        messageColor: '#000000',
        position: 'topRight',
        backgroundColor: '#FFFF00',
      });
      return { images: [], totalHits: 0 };
    }

    return { images: data.hits, totalHits: data.totalHits };
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch data.',
      position: 'topRight',
      backgroundColor: '#FF0000',
    });
    throw error;
  }
}
