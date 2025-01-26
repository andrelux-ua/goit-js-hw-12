import axios from 'axios';

const API_KEY = '48292136-dc008af678147f60b21a3f0d6';
const API_URL = 'https://pixabay.com/api/';

export async function fetchData(inputValue, page = 1, perPage = 15) {
  try {
    const params = {
      key: API_KEY,
      q: inputValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: perPage,
      page,
    };

    const { data } = await axios.get(API_URL, { params });

    if (data.hits.length === 0) {
      return { images: [], totalHits: 0 };
    }

    return { images: data.hits, totalHits: data.totalHits };
  } catch (error) {
    throw new Error('Failed to fetch data.');
  }
}
