import {
  cityByIndexSelector,
  fetchCitiesFulfilledReducer,
  filteredResultsSelector,
  filterSelector,
  setFilterReducer,
  totalSelector,
  initialState as initialStateFromSlice,
} from './citiesSlice';

const fetchCitiesMockResponse = {
  // citiesApi.fetchCities(30, 10, 'Argentina');
  data: [
    {
      country: 'Argentina',
      geonameid: 3861445,
      name: 'Chilecito',
      subcountry: 'La Rioja',
    },
    {
      country: 'Argentina',
      geonameid: 3861416,
      name: 'Chimbas',
      subcountry: 'San Juan',
    },
    {
      country: 'Argentina',
      geonameid: 3861344,
      name: 'Chivilcoy',
      subcountry: 'Buenos Aires',
    },
    {
      country: 'Argentina',
      geonameid: 3861061,
      name: 'Cinco Saltos',
      subcountry: 'Rio Negro',
    },
    {
      country: 'Argentina',
      geonameid: 3861056,
      name: 'Cipolletti',
      subcountry: 'Rio Negro',
    },
    {
      country: 'Argentina',
      geonameid: 3435356,
      name: 'Colegiales',
      subcountry: 'Buenos Aires F.D.',
    },
    {
      country: 'Argentina',
      geonameid: 3860443,
      name: 'Comodoro Rivadavia',
      subcountry: 'Chubut',
    },
    {
      country: 'Argentina',
      geonameid: 3435264,
      name: 'Concepción del Uruguay',
      subcountry: 'Entre Rios',
    },
    {
      country: 'Argentina',
      geonameid: 3435261,
      name: 'Concordia',
      subcountry: 'Entre Rios',
    },
    {
      country: 'Argentina',
      geonameid: 3860259,
      name: 'Córdoba',
      subcountry: 'Cordoba',
    },
  ],
  total: 203,
  filter: 'argentina',
  links: {
    first: 'http://localhost:3030/cities?filter=argentina&limit=10',
    prev: 'http://localhost:3030/cities?filter=argentina&limit=10&offset=20',
    next: 'http://localhost:3030/cities?filter=argentina&limit=10&offset=40',
    last: 'http://localhost:3030/cities?filter=argentina&limit=10&offset=200',
  },
};

describe('citiesSlice', () => {
  describe('reducers', () => {
    describe('setFilterReducer', () => {
      test('should set filter', () => {
        const actionPayload = { type: 'setFilter', payload: 'Argentina' };

        const updatedState = setFilterReducer(
          initialStateFromSlice,
          actionPayload
        );

        expect(updatedState['filter']).toEqual('Argentina');
      });
    });

    describe('fetchCitiesFulfilledReducer', () => {
      const initialState = {
        ...initialStateFromSlice,
        filter: 'Argentina',
      };
      const offset = 30;
      const actionPayload = {
        type: 'fetchCitiesFulfilled',
        payload: {
          offset,
          filter: 'Argentina',
          response: fetchCitiesMockResponse,
        },
      };

      const updatedState = fetchCitiesFulfilledReducer(
        initialState,
        actionPayload
      );

      test('should init filter results', () => {
        expect(
          Array.isArray(updatedState.filteredResults['argentina'].geoNameIds)
        ).toBe(true);
      });

      test('should store geoname ids in the right indices', () => {
        fetchCitiesMockResponse.data
          .map((c) => c.geonameid)
          .forEach((id, index) => {
            expect(
              updatedState.filteredResults['argentina'].geoNameIds[
                index + offset
              ]
            ).toBe(id);
          });
      });

      test('should store total', () => {
        expect(updatedState.filteredResults['argentina'].total).toBe(
          fetchCitiesMockResponse.total
        );
      });

      test('should store cities in a normalized way', () => {
        fetchCitiesMockResponse.data.forEach((city) => {
          expect(updatedState.cities[city.geonameid]).toEqual(city);
        });
      });
    });
  });

  describe('selectors', () => {
    describe('filterSelector', () => {
      test('should return filter value', () => {
        const rootState = {
          cities: { ...initialStateFromSlice, filter: 'Buenos Aires' },
        };

        expect(filterSelector(rootState)).toBe('Buenos Aires');
      });
    });

    describe('totalSelector', () => {
      test('should return the total count for curren filter', () => {
        const rootState = {
          cities: {
            ...initialStateFromSlice,
            filter: 'bue',
            filteredResults: {
              arg: { geoNameIds: [], total: 1000 },
              bue: { geoNameIds: [], total: 100 },
            },
          },
        };

        expect(totalSelector(rootState)).toBe(100);
      });
    });

    describe('filteredResultsSelector', () => {
      test('should return filtered results for current filter', () => {
        const rootState = {
          cities: {
            ...initialStateFromSlice,
            filter: 'arg',
            filteredResults: {
              arg: { geoNameIds: [1, 2, 3, 4, 5], total: 1000 },
              bue: { geoNameIds: [8, 9, 10, 15, 30], total: 100 },
            },
          },
        };

        expect(filteredResultsSelector(rootState)).toEqual([1, 2, 3, 4, 5]);
      });
    });

    describe('cityByIndexSelector', () => {
      test('should return the right city', () => {
        const bahiaCityInfo = {
          country: 'Argentina',
          geonameid: 3865086,
          name: 'Bahía Blanca',
          subcountry: 'Buenos Aires',
        };

        const rootState = {
          cities: {
            ...initialStateFromSlice,
            filter: 'arg',
            filteredResults: {
              arg: {
                geoNameIds: [1, 2, bahiaCityInfo.geonameid, 4, 5],
                total: 1000,
              },
            },
            cities: {
              [bahiaCityInfo.geonameid]: bahiaCityInfo,
            },
          },
        };

        expect(cityByIndexSelector(2)(rootState)).toEqual(bahiaCityInfo);
      });
    });
  });
});
