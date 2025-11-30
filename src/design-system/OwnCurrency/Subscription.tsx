import { cn } from "@/lib";
import { Award } from "lucide-react";

export const Subscription = ({
  className,
  Subscription = "None",
}: {
  className?: string;
  Subscription: string;
}) => {
  return (
    <div
      className={cn(
        `flex gap-1.5 px-3 py-1 rounded-full shadow-sm w-fit items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white`,
        className
      )}
    >
      <Award size={14} className="text-yellow-300 fill-yellow-300" />
      <p className="text-xs font-bold tracking-wide uppercase">{Subscription}</p>
    </div>
  );
};
