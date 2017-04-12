import axios from 'axios';
import qs from 'qs';

class Client {
  constructor(token) {
    this.client = axios.create({
      withCredentials: true,
      headers: {
        common: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      },
      baseURL: config('api.url'),
    });

    // Response interceptors
    const handleResponseSuccess = ({ data }) => deserialize(data);
    const handleResponseError = (error) => Promise.reject(error.response || error);

    // Request interceptors
    const handleRequest = (requestConfig) => requestConfig;

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
  return new Client(token);
}