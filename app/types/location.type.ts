export type TLocation = {
    id: string;
    city: string;
    country: string;
    street: {
      name: string;
      number: number;
    };
    postcode: string;
  };
  
export type LocationFlat = Omit<TLocation, 'street'> & { street: string };