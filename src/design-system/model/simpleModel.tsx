import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib";
import type { ReactNode } from "react";

interface Props {
  Body: ReactNode;
  Trigger: ReactNode;
  Header?: ReactNode;
  DialogCloseEle?: ReactNode;
  DialogSaveEle?: ReactNode;
  Footer?: ReactNode;
  Headertext?: string;
  HeaderDescription?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function SimpleModel2({
  Trigger,
  Body,
  Footer,
  Header,
  Headertext,
  HeaderDescription,
  DialogCloseEle,
  onSubmit,
}: Props) {
  const content = (
    <>
      <DialogHeader>
        {Header ? (
          Header
        ) : (
          <>
            {Headertext && <DialogTitle>{Headertext}</DialogTitle>}
            {HeaderDescription && (
              <DialogDescription>{HeaderDescription}</DialogDescription>
            )}
          </>
        )}
      </DialogHeader>

      {Body}

      {Footer ? (
        Footer
      ) : (
        <DialogFooter>
          {DialogCloseEle && (
            <DialogClose asChild>{DialogCloseEle}</DialogClose>
          )}
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      )}
    </>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg w-full transition-all duration-200">
        {onSubmit ? <form onSubmit={onSubmit}>{content}</form> : content}
      </DialogContent>
    </Dialog>
  );
}
export function SimpleModel({
  Trigger,
  className,
  Body,
  DialogCloseEle,
}: {
  Trigger: ReactNode;
  Body: ReactNode;
  className?: string;
  DialogCloseEle?: ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className={cn("", className)}>
        <>
          {Body}
          {DialogCloseEle && (
            <DialogClose asChild>{DialogCloseEle}</DialogClose>
          )}
        </>
      </DialogContent>
    </Dialog>
  );
}
