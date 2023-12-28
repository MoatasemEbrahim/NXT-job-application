import React, { useMemo } from "react";
import { z } from "zod";
import Link from "next/link";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";

import { useZodForm } from "@/hooks/useForm";
import Form from "@/components/shared/Form";
import TextFieldInput from "@/components/shared/TextFieldInput";
import DateInput from "@/components/shared/DateInput";
import FileUploader from "@/components/shared/FileUploader";
import TimeInput from "@/components/shared/TimeInput";
import TextAreaInput from "@/components/shared/TextAreaInput";
import UsersSelect from "@/components/pages/Session/UsersSelect";
import { createSession } from "@/utils/queries/sessions";
import { Session } from "@/types/session";

const SessionForm = ( { sessionDetails }: { sessionDetails?: Session }) => {
  const { push } = useRouter();

  const sessionSchema = useMemo(() => z.object({
    title: z.string().min(1, "Title can't be empty"),
    subtitle: z.string().min(1, "Subtitle can't be empty"),
    cover_image: z.any().optional(),
    date: z.custom<Dayjs>((value) => dayjs.isDayjs(value), { message: "Invalid date" }),
    from: z.custom<Dayjs>((value) => dayjs.isDayjs(value), { message: "Invalid date" }),
    till: z.custom<Dayjs>((value) => dayjs.isDayjs(value), { message: "Invalid date" }),
    description: z.string().min(1, "Description can't be empty"),
    speaker_ids: z.array(z.number()).nonempty("Array must have at least one element"),
    moderator_ids: z.array(z.number()).nonempty("Array must have at least one element"),
    venue: z.string().optional(),
  }), []);

  const form = useZodForm({
    schema: sessionSchema,
    mode: "onChange",
    defaultValues: {
      title: sessionDetails?.title ?? "",
      subtitle: sessionDetails?.subtitle ?? "",
      date: sessionDetails?.date ? dayjs(sessionDetails?.date) : dayjs().startOf("year"),
      cover_image: sessionDetails?.cover_image,
      from: sessionDetails?.from ? dayjs(sessionDetails?.from) : dayjs().startOf("day"),
      till: sessionDetails?.till ? dayjs(sessionDetails?.till) : dayjs().startOf("day"),
      // @ts-expect-error... // data types are not consistant at all between requests
      speaker_ids: sessionDetails?.moderators.map(s => s.id) ?? [],
      // @ts-expect-error... // data types are not consistant at all between requests
      moderator_ids: sessionDetails?.speakers.map(s => s.id) ?? [],
      description: sessionDetails?.description ?? "",
      venue: sessionDetails?.venue?.name,
    }
  });

  const handleFormSubmission = async (data: unknown) => {
    try {
      await createSession({ eventId: 19, session: data as Record<string, undefined | number | string | Date | number[]>});
      push("/");
    } catch (error) {
      console.warn(error);
    }
  };

  const handleBtnClick = () => form.handleSubmit(handleFormSubmission);

  return (
    <div className="flex flex-col items-center p-3 sm:p-6 h-full">
      <Form
        form={form}
        onSubmit={handleFormSubmission}
        className="flex flex-col items-center"
      >
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
            <button
              className='bg-white border-0 w-24 text-center py-1 sm:py-2 disabled:bg-gray-500 disabled:cursor-not-allowed'
              onClick={handleBtnClick}
              disabled={!form.formState.isValid}
            >
            Next
            </button>
          </div>
        </div>
      
        <div className="w-full sm:w-4/5 bg-gray2 mt-4 p-4 sm:p-10">
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
          <UsersSelect name="speaker_ids" label="Speakers" required className="mb-6 sm:mb-8" />
          <UsersSelect name="moderator_ids" label="Moderators" required className="mb-6 sm:mb-8" />
          <hr className="my-4 bottom-2 border-gray-600" />
          <TextFieldInput name="venue" label="Venue" placeholder="Start Typing..." type="text" className="mb-6 sm:mb-8" inputClassname="text-white" />
        </div>
      </Form>
    </div>
  );
};

export default SessionForm;
