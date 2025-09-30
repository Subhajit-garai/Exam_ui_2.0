import { Button } from "@repo/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@repo/ui/tooltip";
import { type ReactElement } from "react";

interface Props {
  text: string;
  Trigger?: string;
  children?: ReactElement;
}

export function Component({ text, Trigger, children }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {Trigger ? <Button variant="outline">Hover</Button> : children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export { Component as Tooltip };
