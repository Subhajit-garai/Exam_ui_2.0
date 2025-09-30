import  { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from "@repo/lib/utils";


interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <>
      <div className={cn(" bg-card flex flex-col justify-between items-center w-full rounded-lg ", className)}>{children}</div>
    </>
  );
};

export default Card;
