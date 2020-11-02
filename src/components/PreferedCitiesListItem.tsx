import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

interface Props {
  geoNameId: number;
}

export default function PreferedCitiesListItem({ geoNameId }: Props) {
  return (
    <ListItem>
      <ListItemText primary={geoNameId} />
    </ListItem>
  );
}
