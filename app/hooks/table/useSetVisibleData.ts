import { TLocation } from '@/app/types/location.type';
import { SetStateAction, useEffect } from 'react';

type Props = {
  perPage: string;
  page: number;
  filteredData: any;
  setVisibleData: (value: SetStateAction<TLocation[]>) => void;
};

export const useSetVisibleData = ({
  perPage,
  page,
  filteredData,
  setVisibleData,
}: Props) => {
  useEffect(() => {
    const startIdx = (page - 1) * parseInt(perPage);
    const endIdx = startIdx + parseInt(perPage);
    setVisibleData(filteredData.slice(startIdx, endIdx));
  }, [page, perPage, filteredData]);
};
