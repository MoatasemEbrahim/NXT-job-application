import React, { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface TextFieldInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  inputClassname?: string;
  labelClassname?: string;
  icon?: ReactNode;
  type: string;
}

const TextFieldInput = ({
  name, label, placeholder="", required = false, className, inputClassname, labelClassname, type, icon=null, ...props
}: TextFieldInputProps
) => {
  const form = useFormContext();
  const { invalid, isTouched, error } = form.getFieldState(name, form.formState);

  return (
    <div className={twMerge("w-full", className)}>
      <div className="flex justify-between my-1">
        <div>
          <span className={twMerge("text-gray-400 font-medium", labelClassname)}>
            {label}
          </span>
          {required && (<span className="text-red-400 ms-1">*</span>)}
        </div>
        {icon}
      </div>
      <div className="my-1 border-2 border-gray-500 w-full">
        <input
          {...form.register(name)}
          type={type}
          placeholder={placeholder}
          id={name}
          className={twMerge("w-full px-2 py-3 bg-transparent", inputClassname)}
          aria-label={label}
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

export default TextFieldInput;
