import React from 'react';
import { useSelector } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';

import { cityByGeoNameIdSelector } from '../store/citiesSlice';

interface Props {
  geoNameId: number;
}

export default function PreferedCitiesListItem({ geoNameId }: Props) {
  const city = useSelector(cityByGeoNameIdSelector(geoNameId));

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
