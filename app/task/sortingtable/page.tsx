'use client';

import { Input } from '@/components/ui/input';
import { useState } from 'react';
import LocationTable from '@/components/Tables/LocationTable';
import PageSizeSelect from '@/components/Selects/PageSizeSelect';
import TablePagination from '@/components/Paginations/TablePagination';
import { useFetchTableData } from '@/app/hooks/table/useFetchTableData';
import { usePrepareTableData } from '@/app/hooks/table/usePrepareTableData';
import { useSetVisibleData } from '@/app/hooks/table/useSetVisibleData';
import { useSetTotalPages } from '@/app/hooks/table/useSetTotalPages';
import { Switch } from "@/components/ui/switch"
import { THeader } from '@/app/types/table.type';
import { LocationFlat, TLocation } from '@/app/types/location.type';


export default function Page() {
  const [tableHeaders, setTableHeaders] = useState<THeader[]>([]);
  const [tableData, setTableData] = useState<LocationFlat[]>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage, setPerPage] = useState<string>('10');
  const [visibleData, setVisibleData] = useState<TLocation[]>([]);
  const [checked, setChecked] = useState<boolean>(false);

  useFetchTableData({setTableData, setLoading});
  usePrepareTableData({tableData, perPage, setTableHeaders, setFilteredData, setTotalPages});
  useSetVisibleData({perPage, page, filteredData, setVisibleData});
  useSetTotalPages({filteredData, perPage, setTotalPages});

  const handleFilterData = (value: string) => {
    setFilter(value);
    const filteredData = [...tableData];
    const filtered = filteredData.filter((item: any) => {
      return Object.keys(item).some(key => {
        return item[key].toString().toLowerCase().includes(value.toLowerCase());
      });
    });
    setFilteredData(filtered);
  };

  const handleSwitchChange = (checked: boolean) => {
    setChecked(checked);
    if (checked) {
      const sortedData = [...filteredData].sort((a: any, b: any) => {
        return a.city.localeCompare(b.city);
      });
      setFilteredData(sortedData);
    } else {
      setFilteredData(tableData);
    }
  };

  return (
    <>
      <div className="my-8 text-center">
        <p className="text-2xl">
          Task 3: <code className="font-mono font-bold">"Table"</code>
        </p>
        <div className="flex flex-col items-center justify-center mt-16">
          <div className="w-full">
            <div className="container mx-auto px-4 sm:px-8">
              <div className="flex items-center py-4">
                <Input
                  placeholder="Filter data..."
                  value={filter}
                  onChange={event => handleFilterData(event.target.value)}
                  className="max-w-sm mr-4"
                />
                <Switch
                    checked={checked}
                    onCheckedChange={handleSwitchChange}
                  />
              </div>
              <div className="rounded-sm border border-gray-300 ">
                <LocationTable
                  tableHeaders={tableHeaders}
                  tableData={tableData}
                  visibleData={visibleData}
                  loading={loading}
                  setFilteredData={setFilteredData}
                />
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <PageSizeSelect
                  perPage={perPage}
                  setPerPage={setPerPage}
                  setPage={setPage}
                />
              </div>
              <div className="flex items-center justify-center space-x-2 py-4">
                <TablePagination
                  visibleData={visibleData}
                  totalPages={totalPages}
                  page={page}
                  setPage={setPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
