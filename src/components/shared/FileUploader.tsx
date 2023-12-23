import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileUploaderProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  inputClassname?: string;
  labelClassname?: string;
}

const MAX_WIDTH = 800;
const MAX_HEIGHT = 400;

const FileUploader = ({ name, label, required = false, className, inputClassname, labelClassname, ...props }: FileUploaderProps) => {

  const form = useFormContext();
  const { invalid, isTouched, error } = form.getFieldState(name, form.formState);
  const value = form.getValues(name);

  const validate = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;
      image.onload = () => {
        const { width, height } = image;
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          form.setValue(name, null, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
          form.setError(name,  {message:  "Image dimensions exceed maximum limit" });
        } else {
          form.setValue(name, file, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
          form.clearErrors(name);
        }
      };
    };
    reader.readAsDataURL(file);
  }, [form]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) {
      form.setValue(name, null, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
      form.setError(name,  {message:  "Please upload one image in the supported formats" });
    }
    validate(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: {  "image/*": [".svg", ".png", ".jpg", ".gif"]},
  });

  return (
    <>
      <div className={twMerge("w-full", className)}>
        <div className="flex justify-between my-1">
          <div>
            <span className={twMerge("text-gray-400 font-medium", labelClassname)}>
              {label}
            </span>
            {required && (<span className="text-red-400 ms-1">*</span>)}
          </div>
        </div>
        <div
          {...getRootProps()}
          className={twMerge("w-full px-2 py-3 bg-transparent h-36 sm:h-52 border-2 border-dotted border-gray-400 rounded-sm cursor-pointer", inputClassname)}
        >
          <div className="h-1/3 sm:h-1/2 mb-2 flex flex-col-reverse items-center">
            <div className="bg-black1 p-2 sm:p-3 rounded-full">
              <CloudUploadIcon className="text-md sm:text-[30px] text-white" />
            </div>
          </div>
          <div className="h-1/2 flex flex-col items-center">
            <div className="flex flex-wrap gap-1 justify-center">
              <p className="text-white font-medium text-sm sm:text-base">click to upload</p>
              <p className="text-gray1 text-sm sm:text-base">or drag and drop</p>
            </div>
            <div className="my-1 flex justify-center">
              <p className="text-gray1 text-sm sm:text-base text-center">SVG, PNG, JPG or GIF (max. 800 * 400)</p>
            </div>
          </div>
          <input
            {...form.register(name)}
            {...getInputProps()}
            type="file"
            id={name}
            aria-label={label}
            {...props}
          />
        </div>
        {isTouched && invalid && error?.message ? (
          <div className="my-2">
            <span className="text-red-400">
              {error?.message}
            </span>
          </div>
        ):(
          <div className="my-2">
            <span className="text-gray1">
              {value?.name ?? ""}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default FileUploader;
