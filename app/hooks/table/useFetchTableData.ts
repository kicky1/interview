import { LocationFlat } from '@/app/types/location.type';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    setTableData: Dispatch<SetStateAction<LocationFlat[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const fetchData = async () => {
    const res = await fetch('https://randomuser.me/api/?results=50')
      .then(res => res.json())
      .catch(err => console.log(err));
    return res;
  };

export const useFetchTableData = ({setTableData, setLoading} : Props) => {
    useEffect(() => {
        setLoading(true);
        fetchData().then(res => {
        setTableData(
            res.results.map((item: any) => {
            return {
                id: uuidv4(),
                city: item.location.city,
                country: item.location.country,
                street:
                item.location.street.name + ' ' + item.location.street.number,
                postcode: item.location.postcode,
            };
            }),
        );
        setLoading(false);
        });
    },[]);
};