import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import { type  InputOption } from "@repo/types/Input";
import {type  handleInputefn_type } from "@repo/hooks/useHandleInpute";

interface Props {
  handleInputefn: handleInputefn_type;
  value: Record<string, string> | string;
  options: InputOption[];
  color?: string;
}

export function SelectCom({ handleInputefn, value, options }: Props) {
  options = Array.isArray(options) ? options : [options];

  return (
    <>
      {options.map((option: InputOption) => {
        <Select
          disabled={option.disabled}
          key={option.inputId}
          required={option.required}
          value={typeof value === "string" ? value : value[option.name]}
          onValueChange={(value) =>
            handleInputefn({ name: option.name, value: value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={option.placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{option.name}</SelectLabel>
              {option?.options?.map((item: string) => (
                <SelectItem value={item}>{item}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>;
      })}
    </>
  );
}

