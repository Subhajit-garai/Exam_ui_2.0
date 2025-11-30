
import React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@repo/ui/button";
import { Calendar } from "@repo/ui/calendar";
import { Label } from "@repo/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/popover";
import { cn } from "@/lib/utils";

export function SimpleDatepicker({
  lable,
  date,
  setDate,
  buttonClassName
}: {
  lable: string;
  buttonClassName?: string;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        {lable}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className= {cn(buttonClassName ," justify-between font-normal")}
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
