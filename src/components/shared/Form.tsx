import { ComponentProps } from "react";
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props<T extends FieldValues> extends Omit<ComponentProps<"form">, "onSubmit"> {
  form: UseFormReturn<T>;
  formClassName?: string;
  onSubmit: SubmitHandler<T>;
}

const Form = <T extends FieldValues>({ form, formClassName = "", onSubmit, className, children, ...props }: Props<T>) => (
  <FormProvider {...form}>
    <form className={twMerge("w-full", formClassName)} onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <fieldset className={className}>{children}</fieldset>
    </form>
  </FormProvider>
);

export default Form;
