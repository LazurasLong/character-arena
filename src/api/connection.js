import axios from 'axios';
import qs from 'qs';

import { API_KEY } from '../../.env.js';
import { BASE_URL } from '../constants/apiRoutes.js';

class Client {
  constructor() {
    this.client = axios.create({
      baseURL: BASE_URL,
    });

    // Response interceptors
    const handleResponseSuccess = ({ data }) => data;
    const handleResponseError = (error) => Promise.reject(error.response || error);

    // Request interceptors
    const handleRequest = (requestConfig) => {
      return {
        ...requestConfig,
        url: `${requestConfig.url}&apiKey=${API_KEY}`,
      };
    };

    this.client.interceptors.response.use(handleResponseSuccess, handleResponseError);
    this.client.interceptors.request.use(handleRequest);

  }

  get(url, parameters) {
    return this.client.get(url, { parameters });
  }

//   post(url, parameters) {
//     return this.client.post(url, parameters);
//   }

//   put(url, parameters) {
//     return this.client.put(url, parameters);
//   }

//   patch(url, parameters) {
//     return this.client.patch(url, parameters);
//   }

//   delete(url, parameters) {
//     return this.client.delete(url, { parameters });
//   }
}

export default (token) => {
  return new Client();
}