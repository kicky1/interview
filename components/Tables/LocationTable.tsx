import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../ui/table";
import { Dispatch, useState } from "react";

type Props = {
    tableHeaders: THeader[];
    tableData: LocationFlat[];
    visibleData: TLocation[];
    loading: boolean;
    setFilteredData: Dispatch<any>
}

export default function LocationTable({tableHeaders, tableData, visibleData, loading, setFilteredData}: Props) {
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentlySortedBy, setCurrentlySortedBy] = useState<string>('');

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

    return(
        <Table className="table-fixed">
                  <TableHeader>
                    <TableRow className="border-gray-300 bg-gray-900 hover:bg-gray-900">
                      {tableHeaders?.map((header: THeader) => {
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
                      visibleData?.map((row: TLocation) => (
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
    )

}