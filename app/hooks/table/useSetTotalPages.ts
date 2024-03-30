import { SetStateAction, useEffect } from 'react';

type Props = {
  filteredData: string;
  perPage: string;
  setTotalPages: (value: SetStateAction<number>) => void;
};

export const useSetTotalPages = ({
  filteredData,
  perPage,
  setTotalPages,
}: Props) => {
  useEffect(() => {
    const totalPages = Math.ceil(filteredData.length / parseInt(perPage));
    setTotalPages(totalPages);
  });
};
