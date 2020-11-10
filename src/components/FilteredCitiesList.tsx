import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

import { filterSelector, totalSelector, filteredResultsSelector, fetchCities } from '../store/citiesSlice';
import CityListItem from './CityListItem';

export default function FilteredCitiesList() {
  const dispatch = useDispatch();
  const filter = useSelector(filterSelector);
  const count = useSelector(totalSelector);
  const filteredResults = useSelector(filteredResultsSelector);

  const loadMoreItems = useCallback(
    async (offset: number, limit: number) => {
      return await dispatch(
        fetchCities({
          offset,
          limit,
          filter,
        })
      );
    },
    [dispatch, filter]
  );

  const isCityLoaded = (index: number) => {
    return filteredResults && index < filteredResults.length && !!filteredResults[index];
  };

  return (
    <Box border={1} borderRadius={4} borderColor="#ddd">
      {count ? (
        <InfiniteLoader
          isItemLoaded={isCityLoaded}
          itemCount={count}
          loadMoreItems={loadMoreItems}
          minimumBatchSize={50}
          threshold={30}
        >
          {({ onItemsRendered, ref }: any) => (
            <List
              className="List"
              height={300}
              itemCount={count}
              itemSize={50}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width="100%"
            >
              {CityListItem}
            </List>
          )}
        </InfiniteLoader>
      ) : (
        <Box padding={1} height={300}>
          {count === undefined && <Skeleton variant="rect" height={300} />}
          {count === 0 && 'No matching results'}
        </Box>
      )}
    </Box>
  );
}
