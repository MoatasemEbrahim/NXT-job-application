import React, { useMemo } from "react";
import { z } from "zod";
import Link from "next/link";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import dayjs, { Dayjs } from "dayjs";

import { useZodForm } from "@/hooks/useForm";
import Form from "@/components/shared/Form";
import TextFieldInput from "@/components/shared/TextFieldInput";
import DateInput from "@/components/shared/DateInput";
import FileUploader from "@/components/shared/FileUploader";
import TimeInput from "@/components/shared/TimeInput";
import TextAreaInput from "@/components/shared/TextAreaInput";
import SpeakersSelect from "./SpeakersSelectInput";

const EditSession = () => {

  const sessionSchema = useMemo(() => z.object({
    title: z.string().min(1, "Title can't be empty"),
    subtitle: z.string().min(1, "Subtitle can't be empty"),
    cover_image: z.any().optional(),
    date: z.custom<Dayjs>((value) => dayjs.isDayjs(value), { message: "Invalid date" }),
    from: z.custom<Dayjs>((value) => dayjs.isDayjs(value), { message: "Invalid date" }),
    till: z.custom<Dayjs>((value) => dayjs.isDayjs(value), { message: "Invalid date" }),
    description: z.string().min(1, "Description can't be empty"),
    speaker_ids: z.array(z.number()),
    moderator_ids: z.array(z.number()),
    venue: z.string().optional(),
  }), []);

  const form = useZodForm({
    schema: sessionSchema,
    mode: "onBlur",
    defaultValues: {
      title: "",
      subtitle: "",
      date: dayjs().startOf("year"),
      cover_image: undefined,
      from: dayjs().startOf("day"),
      till: dayjs().startOf("day"),
      speaker_ids: [],
      moderator_ids: [],
      description: "",
      venue: "",
    }
  });

  // const { isValid, errors } = form.formState;
  const { speaker_ids } = form.getValues();

  const handleFormSubmission = (data:unknown) => {
    console.log({data});
  };


  return (
    <div className="flex flex-col items-center p-3 sm:p-6 h-full">
      <div className="flex justify-between items-center w-full">
        <div>
          <Link
            href="/"
            className='text-gray1'
            onClick={()=>{}}
          >
            <ArrowBackIosNewIcon className="text-sm" />
            <span className="ms-1">
              All Sessions
            </span>
          </Link>
        </div>
        <div className="flex">
          <Link
            href="/"
            className='bg-gray2 text-white border-0 w-24 text-center py-1 sm:py-2'
            onClick={()=>{}}
          >
            Cancel
          </Link>
          <Link
            href="/session"
            className='bg-white border-0 w-24 text-center py-1 sm:py-2'
            onClick={()=>{}}
          >
            Next
          </Link>
        </div>
      </div>
      <Form
        form={form}
        onSubmit={handleFormSubmission}
        formClassName="w-full sm:w-4/5 bg-gray2 mt-4 p-4 sm:p-10"
      >
        <TextFieldInput name="title" label="Session Title" required placeholder="Start Typing..." type="text" className="mb-6 sm:mb-8" inputClassname="text-white" />
        <TextFieldInput name="subtitle" label="Session Subtitle" required placeholder="Start Typing..." type="text" className="mb-6 sm:mb-8" inputClassname="text-white" />
        <FileUploader name="cover_image" label="Thumbnail" className="mb-6 sm:mb-8" />
        <div className="flex flex-col w-full lg:flex-row gap-0 sm:gap-6">
          <div className="w-full lg:w-1/2">
            <DateInput name="date" label="Date" required className="mb-6 sm:mb-8" />
          </div>
          <div className="w-full lg:w-1/2 flex gap-6">
            <TimeInput name="from" label="From" required className="mb-6 sm:mb-8" />
            <TimeInput name="till" label="Till" required className="mb-6 sm:mb-8" />
          </div>
        </div>
        <TextAreaInput name="description" label="Description" required placeholder="Type details" className="mb-6 sm:mb-8" inputClassname="text-white" />
        <hr className="my-4 bottom-2 border-gray-600" />
        <SpeakersSelect name="speaker_ids" label="Speakers" required className="mb-6 sm:mb-8" />
      </Form>
    </div>
  );
};

export default EditSession;
