import React, { useState, useMemo, useEffect } from "react";
import Select, { OnChangeValue, MenuProps, OptionProps, SingleValue } from "react-select";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { z } from "zod";

import { User } from "@/types/user";
import Form from "@/components/shared/Form";
import { useZodForm } from "@/hooks/useForm";
import TextFieldInput from "./TextFieldInput";
import { createUser } from "@/utils/queries/users";

interface FilterOption<Option> {
  readonly label: string;
  readonly value: string;
  readonly data: Option;
}
interface MultiSelectProps {
  value: number[];
  options: User[];
  onSelect: (option: SingleValue<User>) => void;
  className?: string;
}

const Option = (props: OptionProps<User>) => {
  const { data, innerProps } = props;
  const { first_name, last_name, image }= data;
  const name = `${first_name} ${last_name}`;
  return <div {...innerProps} className="flex px-4 gap-6 h-10 items-center cursor-pointer bg-gray2">
    {image ? <Image width={30} height={30} src={image} alt={name} className="rounded-full" /> : <AccountCircleIcon />}
    <p className="text-white">{name}</p>
  </div>;
};

const Menu = (props: MenuProps<User>) => {
  const [isOpen, setIsOpen] = useState(false);

  const sessionSchema = useMemo(() => z.object({
    first_name: z.string().min(1, "first_name can't be empty"),
    last_name: z.string().min(1, "last_name can't be empty"),
    email: z.string().email(),
  }), []);

  const form = useZodForm({
    schema: sessionSchema,
    mode: "onChange",
  });
  
  const toggleModal = () => { setIsOpen(prevState => !prevState);};

  const handleFormSubmission = async (data: unknown) => {
    try {
      await createUser({ eventId: 19, user: data as User});
      toggleModal();
    } catch (error) {
      console.warn(error);
    }
  };
  
  return (
    <div className="w-full" {...props.innerProps}>
      <div className="px-4 py-2 w-full">
        <button type="button" className="flex justify-between w-full border-b-2 border-gray-500 py-2" onClick={toggleModal}>
          <p className="text-white">Add new user</p>
          <AddOutlinedIcon className="mx-1 sm:mx-2 text-white" />
        </button>
      </div>
      {props.children}
      <Dialog onClose={toggleModal} open={isOpen}>
        <DialogTitle>Create User</DialogTitle>
        <Form
          form={form}
          onSubmit={handleFormSubmission}
          className="flex flex-col items-center"
        >
          <TextFieldInput name="first_name" label="First name" required placeholder="Start Typing..." type="text" className="mb-6 sm:mb-8" inputClassname="text-white" />
          <TextFieldInput name="last_name" label="First name" required placeholder="Start Typing..." type="text" className="mb-6 sm:mb-8" inputClassname="text-white" />
          <TextFieldInput name="email" label="First name" required placeholder="Start Typing..." type="text" className="mb-6 sm:mb-8" inputClassname="text-white" />
          <div className="flex gap-4">
            <button type="button" onClick={toggleModal}>
              Cancel
            </button>
            <button type="submit">
              Add
            </button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};



const MultiSelect = ({ options, onSelect }: MultiSelectProps) => {

  const onChange = (option: OnChangeValue<User, false>) => {
    onSelect(option);
  };

  const filter = (option: FilterOption<User>, searchText: string) => {
    return option.data.first_name.toLowerCase().includes(searchText.toLowerCase()) || option.data.last_name.toLowerCase().includes(searchText.toLowerCase());
  };

  return (
    <Select
      options={options}
      components={{Option, Menu}}
      filterOption={filter}
      isMulti={false}
      onChange={onChange}
      classNames={{
        control: () => "bg-gray2",
        input: () => "bg-gray2 text-white",
        menu: () => "bg-gray2",
      }}
    />
  );
};

export default MultiSelect;
