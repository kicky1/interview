import { LocationFlat } from '@/app/types/location.type';
import { THeader } from '@/app/types/table.type';
import { SetStateAction, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  tableData: LocationFlat[];
  perPage: string;
  setTableHeaders: (value: SetStateAction<THeader[]>) => void;
  setFilteredData: (value: any) => void;
  setTotalPages: (value: SetStateAction<number>) => void;
};

export const usePrepareTableData = ({
  tableData,
  perPage,
  setTableHeaders,
  setFilteredData,
  setTotalPages,
}: Props) => {
  if (tableData?.length) {
    const header = Object.keys(tableData[0])
      .filter(key => key !== 'id')
      .map((key: any) => {
        return {
          name: key,
          id: uuidv4(),
        };
      });
    setTableHeaders(header);
    setFilteredData(tableData);

    const totalPages = Math.ceil(tableData.length / parseInt(perPage));
    setTotalPages(totalPages);
  }
};
