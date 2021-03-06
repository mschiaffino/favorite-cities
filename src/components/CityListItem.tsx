import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ListChildComponentProps } from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

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

  useEffect(() => {
    // To avoid keeping the spinner in case that the component was reused with
    // another city because of a filter change
    setSavingChange(false);
  }, [index]);

  const onClick = async () => {
    if (savingChange || !city) {
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
        {loadingPreferred && <Skeleton variant="rect" width={20} height={20} />}
        {savingChange && <CircularProgress size={20} />}
        {!loadingPreferred && !savingChange && (
          <Checkbox checked={isPreferreed} edge="start" />
        )}
      </Box>
      {city ? (
        <ListItemText
          primary={city?.name}
          secondary={city && `${city.subcountry} - ${city.country} `}
        />
      ) : (
        <Skeleton width={300} />
      )}
    </ListItem>
  );
}
