import React from 'react';
import { useSelector } from 'react-redux';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import { preferredCitiesIdsSelector } from '../store/citiesSlice';
import PreferedCitiesListItem from './PreferedCitiesListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function PreferedCitiesList() {
  const classes = useStyles();
  const preferredCitiesIds = useSelector(preferredCitiesIdsSelector);

  return (
    <List component="nav" className={classes.root} aria-label="contacts">
      {preferredCitiesIds.map((id) => (
        <PreferedCitiesListItem geoNameId={id} />
      ))}
    </List>
  );
}
