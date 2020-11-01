import { ApiResponse } from '../types';

function fetchCities(offset = 0, limit = 1): Promise<ApiResponse> {
  const path = `/cities?offset=${offset}&limit=${limit}`;

  return makeRequest(path).catch(() => {
    //Retry
    return fetchCities(offset, limit);
  });
}

function makeRequest(path: string, method: string = 'GET', data: any = null) {
  const requestParams: RequestInit = {
    method,
  };
  if (data !== null) {
    requestParams.body = JSON.stringify(data);
  }
  const url = getUrl(path);

  return fetch(url, requestParams)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return resp.text();
    })
    .then((respBody) => {
      if (typeof respBody === 'string') {
        return Promise.reject(respBody);
      }
      return Promise.resolve(respBody);
    });
}

function getUrl(path: string): string {
  return `${process.env.REACT_APP_CITIES_API_URL}${path}`;
}

export const citiesApi = {
  fetchCities,
};
