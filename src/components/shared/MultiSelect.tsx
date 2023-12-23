import React from "react";
import Select, { OnChangeValue, ActionMeta, MenuProps, OptionProps, SingleValue } from "react-select";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { User } from "@/types/user";

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
  const handleCreateOption = (e) => {
    // open user creation modal
  };
  
  return (
    <div className="w-full" {...props.innerProps}>
      <div className="px-4 py-2 w-full">
        <button className="flex justify-between w-full border-b-2 border-gray-500 py-2" onClick={handleCreateOption}>
          <p className="text-white">Add new speaker</p>
          <AddOutlinedIcon className="mx-1 sm:mx-2 text-white" />
        </button>
      </div>
      {props.children}
    </div>
  );
};



const MultiSelect = ({ options, onSelect }: MultiSelectProps) => {

  const onChange = (option: OnChangeValue<User, false>, actionMeta: ActionMeta<User>) => {
    console.log("handleSelect, ", option, actionMeta);
    onSelect(option);
  };

  return (
    <Select
      id="1"
      options={options}
      components={{Option, Menu}}
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
