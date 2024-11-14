export enum hotelType {
  'Hotel',
  'Apartments',
  'Resorts',
  'Villas',
  'Cabins',
  'Cottages',
  'Hostels',
}

// export type hotelTypeTypes =
//   | 'Hotels'
//   | 'Apartments'
//   | 'Resorts'
//   | 'Villas'
//   | 'Cabins'
//   | 'Cottages'
//   | 'Hostels';

export type hotelTypeTypes = keyof typeof hotelType;
