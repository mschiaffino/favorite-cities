import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';

import { cityByGeoNameIdSelector, fetchCityById } from '../store/citiesSlice';

interface Props {
  geoNameId: number;
}

export default function PreferedCitiesListItem({ geoNameId }: Props) {
  const dispatch = useDispatch();
  const city = useSelector(cityByGeoNameIdSelector(geoNameId));

  useEffect(() => {
    if (geoNameId && !city) {
      dispatch(fetchCityById({ id: geoNameId }));
    }
  }, [city, geoNameId]);

  return (
    <ListItem>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText
        primary={city ? `${city?.name} (${city?.subcountry})` : 'Loading...'}
      />
    </ListItem>
  );
}
