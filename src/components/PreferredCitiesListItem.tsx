import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import Skeleton from '@material-ui/lab/Skeleton';

import { cityByGeoNameIdSelector, fetchCityById } from '../store/citiesSlice';

interface Props {
  geoNameId: number;
}

export default function PreferredCitiesListItem({ geoNameId }: Props) {
  const dispatch = useDispatch();
  const city = useSelector(cityByGeoNameIdSelector(geoNameId));

  useEffect(() => {
    if (geoNameId && !city) {
      dispatch(fetchCityById({ id: geoNameId }));
    }
  }, [dispatch, city, geoNameId]);

  return (
    <ListItem>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      {city ? (
        <ListItemText primary={city && `${city?.name} (${city?.subcountry})`} />
      ) : (
        <Skeleton width={300} />
      )}
    </ListItem>
  );
}
