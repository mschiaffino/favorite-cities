import React from 'react';
import { useSelector } from 'react-redux';

import { ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

import { cityByIndexSelector, isPreferredSelector } from '../store/citiesSlice';

const useStyles = makeStyles({
  listItem: {
    borderBottom: 'solid 1px #ddd',
  },
});

export default function CityListItem({
  index,
  style,
}: ListChildComponentProps) {
  const classes = useStyles();
  const city = useSelector(cityByIndexSelector(index));
  const isPreferreed = useSelector(isPreferredSelector(city?.geonameid));

  return (
    <ListItem button style={style} key={index} className={classes.listItem}>
      <Checkbox checked={isPreferreed} edge="start" />
      <ListItemText
        primary={city?.name || 'Loading...'}
        secondary={city ? `${city.subcountry} - ${city.country} ` : undefined}
      />
    </ListItem>
  );
}
