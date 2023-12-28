import React, { useState, useCallback, useEffect } from "react";
import MultiSelect from "@/components/shared/MultiSelect";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { getUsers } from "@/utils/queries/users";
import { User } from "@/types/user";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Image from "next/image";
import { OnChangeValue } from "react-select";

interface SpeakersSelectProps {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  inputClassname?: string;
  labelClassname?: string;
}


const UsersSelect = ({name, label, required = false, className, inputClassname, labelClassname, ...props} : SpeakersSelectProps) => {
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
  const selectedUserIds: number[] = form.watch(name);

  const handleSelection = useCallback((option: OnChangeValue<User, false>) => {

    if (!option?.id || selectedUserIds.includes(option.id)){
      return;
    }
    form.setValue(name, [...selectedUserIds, option.id]);
  }, [selectedUserIds]);

  const handleRemove = useCallback((option: User) => () => {
    if (!option?.id) {
      return;
    }
    form.setValue(name, selectedUserIds.filter(id => id !== option.id));
  }, [selectedUserIds]);
  
  useEffect(() => {
    const selectedUsersObjects = selectedUserIds.reduce((acc: User[], userId) => {
      const userObj = users.find(user => user.id === userId);
      return userObj ? [...acc, userObj] : acc;
    },
    []);

    setSelectedUsers(selectedUsersObjects);
  },[selectedUserIds, users]);


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
        <MultiSelect value={selectedUserIds} options={users} onSelect={handleSelection} className={inputClassname} {...props} />
      </div>
      {isTouched && invalid && error?.message && (
        <div>
          <span className="text-red-400">
            {error?.message}
          </span>
        </div>
      )}
      <div>
        {selectedUsers.map(selectedUser => {
          const { first_name, last_name, image }= selectedUser;
          const name = `${first_name} ${last_name}`;

          return (

            <div className="flex w-full my-4 items-center gap-4" key={selectedUser.id}>
              <div className="flex grow border-2 border-gray1 px-4 gap-6 h-10 items-center cursor-pointer bg-gray2">
                {image ? <Image width={30} height={30} src={image} alt={name} className="rounded-full" /> : <AccountCircleIcon />}
                <p className="text-white">{name}</p>
              </div>
              <div>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  className='p-0'
                  onClick={handleRemove(selectedUser)}
                >
                  <DeleteForeverIcon className="text-red-700" />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersSelect;
