import { getLocationData } from '@/app/actions/get-location';
import { LocationFlat } from '@/app/types/location.type';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const useFetchTableData = ({ setLoading }: Props) => {
  const tableData = useRef<LocationFlat[]>([]);

  useEffect(() => {
    setLoading(true);
    getLocationData()
      .then((res: any) => {
        const data = res.results.map((item: any) => ({
          id: uuidv4(),
          city: item.location.city,
          country: item.location.country,
          street: item.location.street.name + ' ' + item.location.street.number,
          postcode: item.location.postcode,
        }));
        tableData.current = data;
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  return { tableData: tableData.current };
};
