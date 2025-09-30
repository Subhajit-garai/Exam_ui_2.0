import React, { memo, useState } from "react";
import { cn } from "@repo/lib/utils/utils";
import { Label } from "@repo/ui/label";
import { Textarea } from "@repo/ui/textarea";
import { Input as TextInput } from "@repo/ui/input";
import { Checkbox } from "@repo/ui/checkbox";
import { SelectCom as Select } from "@repo/design-system/inputs/select/Select";
import { type handleInputefn_type } from "@repo/hooks/useHandleInpute";
import { type InputOption } from "@repo/types/Input";

interface Props {
  handleInputefn: handleInputefn_type;
  value: Record<string, string> | string;
  options: InputOption[];
  color?: string;
}

export const SelectionInput = ({
  handleInputefn,
  value,
  options,
  color,
}: Props) => {
  return (
    <>
      <Select
        value={value}
        options={options}
        color={color}
        handleInputefn={handleInputefn}
      />
    </>
  );
};

export const TextAreainput = ({ handleInputefn, value, options }: Props) => {
  options = Array.isArray(options) ? options : [options];

  return (
    <>
      {options.map((option) => (
        <div key={option.id}>
          <div className="mb-2 block capitalize">
            <Label htmlFor={option.id} title={option.name} />
          </div>
          <Textarea
            name={option.name}
            id={option.inputId}
            placeholder={option.placeholder}
            required={option.required}
            color={option.color}
            cols={option.cols || 20}
            onChange={handleInputefn}
            value={typeof value === "string" ? value : value[option.name]}
            disabled={option.disabled}
          />
        </div>
      ))}
    </>
  );
};

export const Textinput = ({ handleInputefn, value, options }: Props) => {
  options = Array.isArray(options) ? options : [options];

  return (
    <>
      {options.map((option) => (
        <div key={option.id}>
          <div className="mb-2 block capitalize">
            <Label htmlFor={option.id} title={option.name} />
          </div>

          <TextInput
            name={option.name}
            id={option.inputId}
            placeholder={option.placeholder}
            required={option.required}
            color={option.color}
            size={option.cols || 20}
            onChange={handleInputefn}
            value={typeof value === "string" ? value : value[option.name]}
            type={option.type}
            className={option.className}
            disabled={option.disabled}
          />
        </div>
      ))}
    </>
  );
};

export const CheckBoxInput = ({ text, Check, onChange }: any) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Checkbox id="Checkbox" checked={Check} onChange={onChange} />
        <Label htmlFor="accept" className="flex capitalize">
          {text}
        </Label>
      </div>
    </>
  );
};

export default Textinput;
