import { ApiResponse, PreferredCitiesResponse } from '../types';

function fetchCities(
  offset = 0,
  limit = 1,
  filter?: string
): Promise<ApiResponse> {
  let path = `/cities?offset=${offset}&limit=${limit}`;

  if (filter) {
    path += `&filter=${filter}`;
  }

  return makeRequest(path).catch(() => {
    //Retry
    return fetchCities(offset, limit, filter);
  });
}

function fetchCityById(id: number): Promise<ApiResponse> {
  return makeRequest(`/cities/${id}`).catch(() => {
    //Retry
    return fetchCityById(id);
  });
}

function patchPreferred(
  geoNameId: number,
  value: boolean
): Promise<ApiResponse> {
  const payload = { [geoNameId.toString()]: value };
  const path = '/preferences/cities';
  return makeRequest(path, 'PATCH', payload).catch(() => {
    // Retry
    return patchPreferred(geoNameId, value);
  });
}

function fetchPreferred(): Promise<PreferredCitiesResponse> {
  return makeRequest('/preferences/cities').catch(() => {
    // Retry
    return fetchPreferred();
  });
}

function makeRequest(path: string, method: string = 'GET', data: any = null) {
  const requestParams: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (data !== null) {
    requestParams.body = JSON.stringify(data);
  }
  const url = getUrl(path);

  return fetch(url, requestParams)
    .then((resp) => {
      const contentTypeHeader = resp.headers.get('content-type');
      if (resp.ok) {
        return contentTypeHeader?.includes('application/json')
          ? resp.json()
          : null;
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
  fetchCityById,
  fetchPreferred,
  patchPreferred,
};
