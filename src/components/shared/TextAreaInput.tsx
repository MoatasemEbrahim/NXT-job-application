import React, { ReactNode ,ChangeEventHandler } from "react";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface TextAreaInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  inputClassname?: string;
  labelClassname?: string;
  icon?: ReactNode
}

const TextAreaInput = ({
  name, label, placeholder="", required = false, className, inputClassname, labelClassname, icon, ...props
}: TextAreaInputProps
) => {
  const form = useFormContext();
  const { invalid, isTouched, error } = form.getFieldState(name, form.formState);
  const value = form.getValues(name);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> | undefined = (e) => {
    form.setValue(name, e.target.value, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  };

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
        <textarea 
          {...form.register(name)}
          value={value}
          onChange={handleChange}
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

export default TextAreaInput;
