import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import {
  cityByIndexSelector,
  isPreferredSelector,
  loadingPreferredSelector,
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
  const loadingPreferred = useSelector(loadingPreferredSelector);
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
      <Box width={42}>
        {loadingPreferred || savingChange ? (
          <CircularProgress size={20} />
        ) : (
          <Checkbox checked={isPreferreed} edge="start" />
        )}
      </Box>

      <ListItemText
        primary={city?.name || 'Loading...'}
        secondary={city ? `${city.subcountry} - ${city.country} ` : undefined}
      />
    </ListItem>
  );
}
