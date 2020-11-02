import React from 'react';
import { useSelector } from 'react-redux';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box/Box';
import Typography from '@material-ui/core/Typography';

import {
  loadingPreferredSelector,
  preferredCitiesIdsSelector,
} from '../store/citiesSlice';
import PreferredCitiesListItem from './PreferredCitiesListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

export default function PreferredCitiesList() {
  const classes = useStyles();
  const preferredCitiesIds = useSelector(preferredCitiesIdsSelector);
  const loadingPreferred = useSelector(loadingPreferredSelector);

  return (
    <List component="nav" className={classes.root} aria-label="contacts">
      {!loadingPreferred && !preferredCitiesIds.length && (
        <Box paddingLeft={1}>
          <Typography>No cities selected yet</Typography>
        </Box>
      )}
      {preferredCitiesIds.map((id) => (
        <PreferredCitiesListItem geoNameId={id} />
      ))}
    </List>
  );
}
