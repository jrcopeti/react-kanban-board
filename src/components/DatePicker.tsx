import * as React from "react";
import { forwardRef } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "./@/lib/utils";
import { Button, buttonVariants } from "./@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./@/components/ui/popover";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";

type DatePickerProps = {
  date: Date | undefined;
  setDate:
    | SelectSingleEventHandler
    | React.Dispatch<React.SetStateAction<Date>>
    | undefined;
  ref: React.Ref<HTMLButtonElement>;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ date, setDate, isEditing, setIsEditing }, ref) => {
    return (
      <Popover open={isEditing} onOpenChange={setIsEditing}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal focus:border-pallette-600",
              !date && "text-muted-foreground focus:border-pallette-600",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <DayPicker
            classNames={{
              months:
                "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              ),
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell:
                "text-gray-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-gray-400",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-100/50 [&:has([aria-selected])]:bg-gray-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected].day-outside)]:bg-gray-800/50 dark:[&:has([aria-selected])]:bg-gray-800",
              day: cn(
                buttonVariants({ variant: "ghost" }),
                "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
              ),
              day_range_end: "day-range-end",
              day_selected:
                "bg-gray-900 text-gray-50 hover:bg-gray-900 hover:text-gray-50 focus:bg-gray-900 focus:text-gray-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50 dark:hover:text-gray-900 dark:focus:bg-gray-50 dark:focus:text-gray-900",
              day_today:
                "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50",
              day_outside:
                "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-100/50 aria-selected:text-gray-500 aria-selected:opacity-30 dark:text-gray-400 dark:aria-selected:bg-gray-800/50 dark:aria-selected:text-gray-400",
              day_disabled: "text-gray-500 opacity-50 dark:text-gray-400",
              day_range_middle:
                "aria-selected:bg-gray-100 aria-selected:text-gray-900 dark:aria-selected:bg-gray-800 dark:aria-selected:text-gray-50",
              day_hidden: "invisible",
              // ...classNames,
            }}
            mode="single"
            selected={date}
            onSelect={setDate as SelectSingleEventHandler}
          />
        </PopoverContent>
      </Popover>
    );
  },
);

DatePicker.displayName = "DatePicker";

export default DatePicker;
