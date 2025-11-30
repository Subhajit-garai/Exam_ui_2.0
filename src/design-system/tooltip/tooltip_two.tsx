import { Button } from "@repo/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ui/tooltip";
import { cn } from "@repo/lib/utils";
import { type ReactNode } from "react";

type CustomTooltipContentProps = {
  extraClass?: string; // 👈 your custom prop
  children?: ReactNode;
  btntext?: string;
  tooltiptext: string;
  text?: string;
};

export function Tooltip_two({
  children,
  text,
  btntext,
  tooltiptext,
  extraClass,
}: CustomTooltipContentProps) {
  return (
    <Tooltip>
      {btntext && (
        <TooltipTrigger asChild>
          <Button variant="outline">{btntext}</Button>
        </TooltipTrigger>
      )}
      {text && (
        <TooltipTrigger asChild>
          <p className={cn("", extraClass)}>{text}</p>
        </TooltipTrigger>
      )}

      {children && <TooltipTrigger asChild>{children}</TooltipTrigger>}

      <TooltipContent>
        {tooltiptext ? <p className={cn("")}>{tooltiptext}</p> : "Click"}
      </TooltipContent>
    </Tooltip>
  );
}
