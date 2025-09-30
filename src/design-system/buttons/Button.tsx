import { Marker } from "./Marker.js";
import { cn } from "@repo/lib/utils";

export const MyButton = ({
  icon,
  children,
  href,
  containerClassName="g4",
  onClick,
  markerFill,
  height="h-12",
  width="w-12",
  padding = "p-2",
  gap = "gap-2",
  rounded= "rounded-2xl",
}: {
  icon?: string;
  children: any;
  href?: string;
  containerClassName?: string;
  onClick?: () => void;
  markerFill?: string;
  height?: string;
  width?: string;
  padding?: string;
  gap?: string;
  rounded?: string;
}) => {

  const Inner = () => (
    <>
      <span
        className={cn(
          "relative flex items-center inner-before group-hover:before:opacity-100 overflow-hidden",
          height,
          width,
          padding,
          gap,
          rounded
        )}
      >
        <span className="absolute -left-px">
          <Marker color={markerFill} />
        </span>

        {icon && (
          <img
            src={icon}
            alt="circle"
            className="size-10 mr-5 object-contain "
          />
        )}

        <span className="relative z-2 font-poppins base-bold text-p1 uppercase">
          {children}
        </span>

        <span className="absolute -right-px rotate-180">
          <Marker color={markerFill} />
        </span>
      </span>

      <span className="glow-before glow-after" />
    </>
  );

  return href ? (
    <a
      className={cn(
        "relative p-0.5 rounded-2xl shadow-500 group",
        containerClassName
      )}
      href={href}
    >
      <Inner />
    </a>
  ) : (
    <button
      className={cn(
        "relative p-0.5 rounded-2xl shadow-500 group",
        containerClassName
      )}
      onClick={onClick}
    >
      <Inner />
    </button>
  );
};
