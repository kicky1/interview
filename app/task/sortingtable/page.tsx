'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';

type Location = {
  id: string;
  city: string;
  country: string;
  street: {
    name: string;
    number: number;
  };
  postcode: string;
};

type Header = {
  id: string;
  name: string;
};

const fetchData = async () => {
  const res = await fetch('https://randomuser.me/api/?results=50')
    .then(res => res.json())
    .catch(err => console.log(err));

  return res
};

export default function Page() {
  const [tableHeaders, setTableHeaders] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [filteredData, setFilteredData] = useState<any>([]);
  const [currentlySortedBy, setCurrentlySortedBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [visibleData, setVisibleData] = useState<any[]>([]);

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
            postcode: item.location.postcode
          };
        })
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

      const totalPages = Math.ceil(tableData.length / perPage);
      setTotalPages(totalPages);
    }
  }, [tableData]);

  useEffect(() => {
    const startIdx = (page - 1) * perPage;
    const endIdx = startIdx + perPage;
    setVisibleData(filteredData.slice(startIdx, endIdx));
  }, [page, perPage, filteredData]);

  useEffect(() => {
    const totalPages = Math.ceil(filteredData.length / perPage);
    setTotalPages(totalPages);
  }, [filteredData, perPage]);

  const sortBy = (value: string) => {
    const sortedData = [...tableData];
    sortedData.sort((a: any, b: any) => {
      if (a[value] < b[value]) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[value] > b[value]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setFilteredData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

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
      <div className="my-16 text-center">
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
                <Table className="table-fixed">
                  <TableHeader>
                    <TableRow className="border-gray-300 bg-gray-900 hover:bg-gray-900">
                      {tableHeaders?.map((header: Header) => {
                        return (
                          <TableHead key={header.name}>
                            <Button
                              variant={'ghost'}
                              size="sm"
                              className={`text-left bg-gray-900 hover:bg-gray-800 hover:text-gray-300 ${
                                currentlySortedBy === header.name &&
                                'text-gray-300'
                              }`}
                              onClick={() => {
                                sortBy(header.name);
                                setCurrentlySortedBy(header.name);
                              }}
                            >
                              {header.name}
                              <ArrowUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visibleData?.length ? (
                      visibleData?.map((row: Location) => (
                        <TableRow
                          key={row.id}
                          className="border-gray-300 bg-gray-100"
                        >
                          {Object.keys(row)
                            .filter(key => key !== 'id')
                            .map((key: string) => {
                              return (
                                <TableCell key={key} className="break-words">
                                  {(row as any)[key]}
                                </TableCell>
                              );
                            })}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={tableHeaders.length}
                          className="h-24 text-center"
                        >
                          {loading ? 'Loading...' : 'No results.'}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="flex items-center justify-end space-x-2 py-4">
                <Select
                  onValueChange={(value: number) => {
                    setPerPage(value);
                    setPage(1);
                  }}
                  defaultValue={perPage}
                >
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={10}>10</SelectItem>
                    <SelectItem value={20}>20</SelectItem>
                    <SelectItem value={50}>50</SelectItem>
                    <SelectItem value={100}>100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-center space-x-2 py-4">
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1 || visibleData.length === 0}
                  >
                    Previous
                  </Button>
                  {Array.from(Array(totalPages).keys()).map((item, index) => {
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(index + 1)}
                        disabled={page === index + 1}
                      >
                        {index + 1}
                      </Button>
                    );
                  })}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages || visibleData.length === 0}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
