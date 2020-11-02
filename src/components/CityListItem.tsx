import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
  cityByIndexSelector,
  isPreferredSelector,
  patchPreferred,
} from '../store/citiesSlice';

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
  const dispatch = useDispatch();
  const city = useSelector(cityByIndexSelector(index));
  const isPreferreed = useSelector(isPreferredSelector(city?.geonameid));
  const [savingChange, setSavingChange] = useState(false);

  const onClick = async () => {
    if (savingChange) {
      return;
    }
    setSavingChange(true);
    await dispatch(
      patchPreferred({ geoNameId: city.geonameid, value: !isPreferreed })
    );
    setSavingChange(false);
  };

  return (
    <ListItem
      button
      style={style}
      key={index}
      className={classes.listItem}
      onClick={onClick}
    >
      <Checkbox checked={isPreferreed} edge="start" />
      <ListItemText
        primary={city?.name || 'Loading...'}
        secondary={city ? `${city.subcountry} - ${city.country} ` : undefined}
      />
      {savingChange && <CircularProgress />}
    </ListItem>
  );
}
