import { Button } from "@repo/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/tooltip";
import { cn } from "@repo/lib/utils";
import { type ReactNode } from "react";

type CustomTooltipContentProps = {
  extraClass?: string; // 👈 your custom prop
  children?: ReactNode;
  btntext?: string;
  text: string;
};

export function TooltipBtn({
  children,
  text,
  btntext,
  extraClass,
}: CustomTooltipContentProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {text ? <p className={cn("", extraClass)}>{text}</p> : "no text"}
        {children && children}
        <Button variant="outline">{btntext}</Button>
      </TooltipTrigger>
      <TooltipContent>
        {btntext ? <p className={cn("")}>{btntext}</p> : "Click"}
      </TooltipContent>
    </Tooltip>
  );
}
