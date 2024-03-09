import { Button } from "../ui/button";
import { SetStateAction } from "react";

type Props = {
    visibleData:  TLocation[];
    totalPages: number, 
    page: number;
    setPage: (value: SetStateAction<number>) => void
}

export default function TablePagination({visibleData, totalPages, page, setPage} : Props) { 
    return(
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
    )
}