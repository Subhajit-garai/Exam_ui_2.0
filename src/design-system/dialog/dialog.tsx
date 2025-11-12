import * as React from "react";

import { Button } from "@repo/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/dialog";
// A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

import { useIsMobile } from "@repo/hooks/isMobile";
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

export function DialogBox({
  TriggerBtnText,
  dialogDescription,
  Title,
  children,
}: {
  TriggerBtnText: string;
  Title?: string;
  dialogDescription?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = !useIsMobile();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {TriggerBtnText && (
            <Button variant="outline">{TriggerBtnText}</Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{Title}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
            {children}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        {TriggerBtnText && <Button variant="outline">{TriggerBtnText}</Button>}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{Title}</DrawerTitle>
          <DrawerDescription>{dialogDescription}</DrawerDescription>
        </DrawerHeader>
        {children}

        <DrawerFooter className="pt-2">
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
