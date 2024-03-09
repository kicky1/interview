type TLocation = {
    id: string;
    city: string;
    country: string;
    street: {
      name: string;
      number: number;
    };
    postcode: string;
  };
  
type LocationFlat = Omit<TLocation, 'street'> & { street: string };