import React from 'react';
import { useSelector } from 'react-redux';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListChildComponentProps } from 'react-window';

import { cityByIndexSelector } from '../store/citiesSlice';
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <ListItem button style={style} key={index} className={classes.listItem}>
      <ListItemText primary={city?.name} />
    </ListItem>
  );
}
