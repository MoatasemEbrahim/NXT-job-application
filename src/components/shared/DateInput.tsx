import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

interface DateInputProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  inputClassname?: string;
  labelClassname?: string;
}

const DateInput = ({ name, label, required = false, className, inputClassname, labelClassname, ...props }: DateInputProps) => {

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
        <DatePicker
          {...form.register(name)}
          onChange={value => {
            form.setValue(name,value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
          }}
          value={value}
          format="MMM . DD . YYYY"
          className={twMerge("w-full px-2 py-3 bg-transparent border-0", inputClassname)}
          aria-label={label}
          defaultValue={dayjs(Date.now())}
          views={["year", "month", "day"]}
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

export default DateInput;
