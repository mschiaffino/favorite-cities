import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';

import {
  filterSelector,
  totalSelector,
  filteredResultsSelector,
  fetchCities,
} from '../store/citiesSlice';

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
    return (
      filteredResultsSelector &&
      index < filteredResultsSelector.length &&
      !!filteredResults[index]
    );
  };

  return (
    <InfiniteLoader
      isItemLoaded={isCityLoaded}
      itemCount={count}
      loadMoreItems={loadMoreItems}
      minimumBatchSize={100}
      threshold={50}
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
          {({ index, style }) => (
            <div className="ListItem" style={style}>
              {index}
            </div>
          )}
        </List>
      )}
    </InfiniteLoader>
  );
}
