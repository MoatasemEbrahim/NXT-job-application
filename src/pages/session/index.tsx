import React from "react";

import { getLayout } from "@/components/Layout";
import Session from "@/components/pages/Session";

export const CreateSessionPage = () => {
  return (
    <Session />
  );
};

CreateSessionPage.getLayout = getLayout;

export default CreateSessionPage;
