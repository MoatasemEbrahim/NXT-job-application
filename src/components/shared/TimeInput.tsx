import React from "react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface TimeInputProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  inputClassname?: string;
  labelClassname?: string;
}

const TimeInput = ({ name, label, required = false, className, inputClassname, labelClassname, ...props }: TimeInputProps) => {

  const form = useFormContext();
  const { invalid, isTouched, error } = form.getFieldState(name, form.formState);
  const value = form.getValues(name);

  return (
    <div className={twMerge("w-full", className)}>
      <div className="flex justify-between my-1">
        <div>
          <span className={twMerge("text-gray-400 font-medium", labelClassname)}>
            {label}
          </span>
          {required && (<span className="text-red-400 ms-1">*</span>)}
        </div>
      </div>
      <div className="my-1 border-2 border-gray-500 w-full">
        <TimePicker
          {...form.register(name)}
          onChange={value => {
            form.setValue(name,value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
          }}
          value={value}
          className={twMerge("w-full px-2 py-3 bg-transparent border-0", inputClassname)}
          aria-label={label}
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiOutlinedInput-input": {
              padding: "4px",
              color: isTouched ? "#fff" : "gray",
            },
            "& .MuiIconButton-root": {
              color: "gray",
            }
          }}
          slotProps={{
            inputAdornment: {
              sx: {
                padding: 0
              }
            }
           
          }}
          {...props}
        />

      </div>
      {isTouched && invalid && error?.message && (
        <div>
          <span className="text-red-400">
            {error?.message}
          </span>
        </div>
      )}
    </div>
  );
};

export default TimeInput;
