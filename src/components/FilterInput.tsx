import React from 'react';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FilterListIcon from '@material-ui/icons/FilterList';

interface Props {
  onFilterChanged: (filter: string) => void;
}

export default function FilterInput({ onFilterChanged }: Props) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder="Type to filter by city name or country"
      onChange={(e) => onFilterChanged(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FilterListIcon />
          </InputAdornment>
        ),
      }}
    />
  );
}
