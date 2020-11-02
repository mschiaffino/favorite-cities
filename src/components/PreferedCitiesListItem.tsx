import React from 'react';
import { useSelector } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { cityByGeoNameIdSelector } from '../store/citiesSlice';

interface Props {
  geoNameId: number;
}

export default function PreferedCitiesListItem({ geoNameId }: Props) {
  const city = useSelector(cityByGeoNameIdSelector(geoNameId));

  return (
    <ListItem>
      <ListItemText primary={city?.name} />
    </ListItem>
  );
}
