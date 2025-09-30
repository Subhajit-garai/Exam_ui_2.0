import React, { useState } from "react";

type FormValues = Record<string, string>;

export type HandleInputEvent =
  | React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  | { name: string; value: string }
  | any ;

export type handleInputefn_type = (e: HandleInputEvent) => void;
export type HandleInputeReturn = {
  value: FormValues;
  handleInputefn: handleInputefn_type;
  setValue: React.Dispatch<React.SetStateAction<FormValues>>;
};

const useHandleinpute = (initialstate: FormValues = {}): HandleInputeReturn => {
  let [value, setValue] = useState<FormValues>(initialstate);

  const handleInputefn = (
    e:
      | React.ChangeEvent<
          HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
        >
      | { name: string; value: string }
  ) => {
    if ("target" in e) {
      let { name, value } = e.target;
      setValue((prev) => ({
        ...prev,
        [name]: value, // Update the state for the specific input
      }));
    } else {
      // Shadcn Select
      const { name, value: val } = e;
      setValue((prev) => ({
        ...prev,
        [name]: val,
      }));
    }
  };
  return { value, handleInputefn, setValue };
};

export default useHandleinpute;
