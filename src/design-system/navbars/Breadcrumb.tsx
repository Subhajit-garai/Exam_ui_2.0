// import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/breadcrumb";

import { Button } from "@repo/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@repo/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/dropdown-menu";
import { useIsMobile } from "@repo/hooks/isMobile";
import React from "react";

const capitalizedFirstletterOfString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// export function Component() {
//   const pathnames = useLocation()
//     .pathname.split("/")
//     .filter((str) => str.trim() !== ""); // split "/" and remove empty string("")

//   const getFullPath = (index: number) =>
//     "#/" + pathnames.slice(0, index + 1).join("/");
//   return (
//     <>
//       <Breadcrumb>
//         <BreadcrumbList>
//           <BreadcrumbItem>
//             <BreadcrumbLink href="/">Home</BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbSeparator />
//           <BreadcrumbItem>
//             <BreadcrumbLink asChild>
//               <Link to={items[0].href ?? "/"}>{items[0].label}</Link>
//             </BreadcrumbLink>{" "}
//           </BreadcrumbItem>
//           <BreadcrumbSeparator />
//           <BreadcrumbItem>
//             <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
//           </BreadcrumbItem>
//         </BreadcrumbList>
//       </Breadcrumb>

//       {/*  */}
//       {/* <Breadcrumb aria-label="Breadcrumb" className="pl-4 pt-4">

//         {pathnames.map((path, index) => {
//           return (
//             <BreadcrumbItem key={index} href={getFullPath(index)}>
//               {capitalizedFirstletterOfString(path)}
//             </BreadcrumbItem>
//           );
//         })}
//       </Breadcrumb> */}
//     </>
//   );
// }

// export function Component() {
//   const pathnames = useLocation()
//     .pathname.split("/")
//     .filter((str) => str.trim() !== ""); // split "/" and remove empty string("")

//   const getFullPath = (index: number) =>
//     "#/" + pathnames.slice(0, index + 1).join("/");
//   return (
//     <Breadcrumb aria-label="Breadcrumb" className="pl-4 pt-4">
//       {pathnames.map((path, index) => {
//         return (
//           <BreadcrumbItem key={index} href={getFullPath(index)}>
//             {capitalizedFirstletterOfString(path)}
//           </BreadcrumbItem>
//         );
//       })}
//     </Breadcrumb>
//   );
// }

const ITEMS_TO_DISPLAY = 3;

export function Component() {
  const pathnames = useLocation()
    .pathname.split("/")
    .filter((str) => str.trim() !== ""); // split "/" and remove empty string("")

  const getFullPath = (index: number) =>
    "/" + pathnames.slice(0, index + 1).join("/");

  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <>
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={"/"}>{"Home"}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {pathnames.length > ITEMS_TO_DISPLAY ? (
              <>
                <BreadcrumbItem>
                  {!isMobile ? ( //desktop
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                      <DropdownMenuTrigger
                        className="flex items-center gap-1"
                        aria-label="Toggle menu"
                      >
                        <BreadcrumbEllipsis className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {pathnames
                          .slice(1, -2)
                          .map((path: string, index: number) => (
                            <DropdownMenuItem key={index}>
                              <Link to={path ? getFullPath(index) : "#"}>
                                {capitalizedFirstletterOfString(
                                  pathnames[index] ?? ""
                                )}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Drawer open={open} onOpenChange={setOpen}>
                      <DrawerTrigger aria-label="Toggle Menu">
                        <BreadcrumbEllipsis className="h-4 w-4" />
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader className="text-left">
                          <DrawerTitle>Navigate to</DrawerTitle>
                          <DrawerDescription>
                            Select a page to navigate to.
                          </DrawerDescription>
                        </DrawerHeader>
                        <div className="grid gap-1 px-4">
                          {pathnames
                            .slice(1, -2)
                            .map((path: string, index: number) => (
                              <Link
                                key={index}
                                to={path ? getFullPath(index) : "#"}
                                className="py-1 text-sm"
                              >
                                {capitalizedFirstletterOfString(
                                  pathnames[index] ?? ""
                                )}
                              </Link>
                            ))}
                        </div>
                        <DrawerFooter className="pt-4">
                          <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  )}
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : null}
            {pathnames
              .slice(-ITEMS_TO_DISPLAY + 1)
              .map((_: string, index: number) => (
                <BreadcrumbItem key={index}>
                  {getFullPath(index) &&
                  pathnames.slice(-ITEMS_TO_DISPLAY + 1).length != index + 1 ? (
                    <>
                      <BreadcrumbLink
                        asChild
                        className="max-w-20 truncate md:max-w-none"
                      >
                        <Link to={getFullPath(index)}>
                          {capitalizedFirstletterOfString(
                            pathnames[index] ?? ""
                          )}
                        </Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  ) : (
                    <BreadcrumbPage className="max-w-20 truncate md:max-w-none dark:text-primary">
                      {capitalizedFirstletterOfString(pathnames[index] ?? "")}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
}

export default Component;
