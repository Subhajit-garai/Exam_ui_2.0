import type { LucideIcon } from "lucide-react";
import { Tooltip_one  as Tooltip} from "../tooltip/tooltip_one";

export const EditorIconCont = ({
  Icon,
  Color,
  text = "no text",
}: {
  Icon: LucideIcon;
  Color?: string;
  text: string;
}) => {
  return (
    <>
      {typeof Icon !== "string" ? (
        <>
          <Tooltip text={text}>
            <div className="flex w-fit h-fit">
              <Icon color={Color} />
            </div>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip text={text}>
            <div className="flex w-fit h-fit">
              <p className="text-xl cursor-default  font-semibold">{Icon}</p>
            </div>
          </Tooltip>
        </>
      )}
    </>
  );
};

export const ColorContIcon = ({
  Color,
  size = 20,
  text = "no text",
  isCircle = false,
  BorderColor = "border-cyan-400",
}: {
  Color: string;
  size?: number;
  text: string;
  isCircle: boolean;
  BorderColor: string;
}) => {
  return (
    <>
      <Tooltip text={text}>
        <span
          className={`inline-block ${
            isCircle ? "rounded-full" : "rounded-md"
          } border-2 ${BorderColor}`}
          style={{
            backgroundColor: Color,
            width: `${size}px`,
            height: `${size}px`,
          }}
        ></span>
      </Tooltip>
    </>
  );
};
