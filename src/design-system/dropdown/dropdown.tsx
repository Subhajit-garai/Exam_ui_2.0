import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import type { MouseEventHandler, ReactNode } from "react";

interface drawer_data {
  name: string;
  Onclick: MouseEventHandler<HTMLDivElement>;
}

interface props {
  children: ReactNode;
  data: drawer_data[];
}

export const drawer_one = ({ children, data }: props) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          {data.map((drawer) => {
            if (Array.isArray(drawer)) {
              return (
                <>
                  {drawer.map(() => {
                    return (
                      <DropdownMenuLabel onClick={drawer.Onclick}>
                        {drawer.name}
                      </DropdownMenuLabel>
                    );
                  })}
                  <DropdownMenuSeparator />
                </>
              );
            } else {
              return (
                <DropdownMenuLabel onClick={drawer.Onclick}>
                  {drawer.name}
                </DropdownMenuLabel>
              );
            }
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
