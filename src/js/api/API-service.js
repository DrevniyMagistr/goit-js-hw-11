import axios from 'axios';
import apiSettings from './settings';

const { API_URL, API_KEY } = apiSettings;

export default class DataApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = 0;

    this.request = {
      params: {
        key: `${API_KEY}`,
        q: this.searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        page: this.page,
        per_page: 40,
        safesearch: true,
      },
    };
  }

  async requestData() {
    try {
      const response = await axios.get(API_URL, this.request);
      const { hits, total, totalHits } = await response.data;
  
      this.totalHits = total;
  
      if (response.status.ok) {
        this.nextPage();
      }
  
      return response.data;
    } catch (error) {}
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  get hits() {
    return this.totalHits;
  }

  set query(newQuery) {
    this.request.params.q = newQuery;
  }
}
