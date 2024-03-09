import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from '@/components/ui/select';
import { SetStateAction } from "react";

type Props = {
    perPage: string;
    setPerPage: (value: SetStateAction<string>) => void;
    setPage:  (value: SetStateAction<number>) => void
}

export default function PageSizeSelect({perPage, setPerPage, setPage}: Props) {
    return(
        <Select
            onValueChange={(value: string) => {
            setPerPage(value);
            setPage(1);
            }}
            defaultValue={perPage}
        >
            <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value={'10'}>10</SelectItem>
            <SelectItem value={'20'}>20</SelectItem>
            <SelectItem value={'50'}>50</SelectItem>
            <SelectItem value={'100'}>100</SelectItem>
            </SelectContent>
        </Select>
    )
}