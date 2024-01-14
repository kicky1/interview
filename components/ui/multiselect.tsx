import React, { Dispatch, SetStateAction } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type Item = {
  label: string;
  value: string;
};

type Props = {
  items: Item[];
  searchable?: boolean;
  values: string[];
  className?: string;
  setValues: Dispatch<SetStateAction<string[]>>;
};

export const Multiselect = React.forwardRef<
  React.ElementRef<typeof Button>,
  Props
>(({ items, searchable, values, className, setValues }, ref) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        ref={ref}
        variant="outline"
        className={cn('flex justify-between', className)}
      >
        <span className="text-left w-28 truncate">
          {values.length == 0
            ? 'Select item'
            : values
                .map(value => {
                  const itemsArray = items.find(item => item.value === value);
                  return itemsArray ? itemsArray.label : null;
                })
                .join(', ')}
        </span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[200px] p-0">
      <Command>
        {searchable && (
          <>
            <CommandInput placeholder="Search items..." />
            <CommandEmpty>No item found.</CommandEmpty>
          </>
        )}
        <CommandGroup>
          {items.map((item: Item) => (
            <CommandItem
              value={item.label}
              key={item.value}
              onSelect={() => {
                setValues((prev: string[]) => {
                  if (!prev.includes(item.value)) {
                    return [...prev, item.value];
                  } else {
                    return prev.filter((p: string) => p !== item.value);
                  }
                });
              }}
            >
              <Check
                className={cn(
                  'mr-2 h-4 w-4',
                  values.includes(item.value) ? 'opacity-100' : 'opacity-0',
                )}
              />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
));
