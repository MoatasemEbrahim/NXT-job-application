import React, { useState, useCallback, useEffect } from "react";
import MultiSelect from "@/components/shared/MultiSelect";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { getUsers } from "@/utils/queries/users";
import { User } from "@/types/user";

interface SpeakersSelectProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  inputClassname?: string;
  labelClassname?: string;
}


const SpeakersSelect = ({name, label, required = false, className, inputClassname, labelClassname, ...props} : SpeakersSelectProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async() => {
    try {
      const response = await getUsers({ eventId: 19 });
      setUsers(response.users);
    } catch (error) {
      setUsers([]);
    }
  },[]);

  useEffect(() => {
    fetchUsers();
  },[fetchUsers]);
  
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
        <MultiSelect value={value} options={users} onSelect={() =>{}} className={inputClassname} {...props} />
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

export default SpeakersSelect;
