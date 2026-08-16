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
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: {
  TriggerBtnText?: string;
  Title?: string;
  dialogDescription?: string;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isDesktop = !useIsMobile();

  const isControlled = externalOpen !== undefined;
  const open = isControlled ? externalOpen : internalOpen;
  const setOpen = (val: boolean) => {
    if (externalOnOpenChange) externalOnOpenChange(val);
    if (!isControlled) setInternalOpen(val);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {TriggerBtnText ? (
          <DialogTrigger asChild>
            <Button variant="outline">{TriggerBtnText}</Button>
          </DialogTrigger>
        ) : null}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            {Title && <DialogTitle>{Title}</DialogTitle>}
            {dialogDescription && (
              <DialogDescription>{dialogDescription}</DialogDescription>
            )}
            {children}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {TriggerBtnText ? (
        <DrawerTrigger asChild>
          <Button variant="outline">{TriggerBtnText}</Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader className="text-left">
          {Title && <DrawerTitle>{Title}</DrawerTitle>}
          {dialogDescription && (
            <DrawerDescription>{dialogDescription}</DrawerDescription>
          )}
        </DrawerHeader>
        {children}

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
