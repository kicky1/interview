'use client';

import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import LocationTable from '@/components/Tables/LocationTable';
import PageSizeSelect from '@/components/Selects/PageSizeSelect';
import TablePagination from '@/components/Paginations/TablePagination';

const fetchData = async () => {
  const res = await fetch('https://randomuser.me/api/?results=50')
    .then(res => res.json())
    .catch(err => console.log(err));
  return res;
};

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
  }, []);

  useEffect(() => {
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
  }, [tableData]);

  useEffect(() => {
    const startIdx = (page - 1) * parseInt(perPage);
    const endIdx = startIdx + parseInt(perPage);
    setVisibleData(filteredData.slice(startIdx, endIdx));
  }, [page, parseInt(perPage), filteredData]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredData.length / parseInt(perPage));
    setTotalPages(totalPages);
  }, [filteredData, parseInt(perPage)]);

  
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
                  className="max-w-sm"
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
