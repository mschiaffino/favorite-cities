export type ApiResponse = {
  data: CityInfo[];
  total: number;
  links: {
    first: string;
    next?: string;
    prev?: string;
    last: string;
  };
  filter?: string;
};

export type CityInfo = {
  geonameid: number;
  name: string;
  country: string;
  subcountry?: string;
};
