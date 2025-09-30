import { cn } from "@repo/lib";
import { Award } from "lucide-react";

export const Subscription = ({
  className,
  Subscription = "None",
}: {
  className: string;
  Subscription: string;
}) => {
  return (
    <div
      className={cn(
        ` flex gap-2 p-1 px-2 rounded-md shadow-md w-fit  items-center bg-linear-to-br from-cyan-400 via-blue-400 to-indigo-400`,
        className
      )}
    >
      <Award color="#e1e515" />
      <p>{Subscription}</p>
    </div>
  );
};
