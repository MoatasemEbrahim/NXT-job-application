import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getLayout } from "@/components/Layout";
import { getSession } from "@/utils/queries/sessions";
import SessionForm from "@/components/pages/Session";
import { Session } from "@/types/session";

export const EditSessionPage = () => {

  const { query : { id }, isReady} = useRouter();
  const [sessionDetails, setSessionDetails] = useState<Session | null>(null);

  const fetchSession = useCallback(async () => {
    try {
      const data = await getSession({ sesssionId: id as unknown as number, eventId: 19});
      setSessionDetails(data);
    } catch (error) {
      setSessionDetails(null);
    }
  },
  [id]);

  useEffect(() => {
    if (!isReady) return;
    fetchSession();
  }, [fetchSession, isReady]);

  if(!sessionDetails) {
    return <p className="text-gray-300 p-6">Loading...</p>;
  }
  
  return (
    <SessionForm sessionDetails={sessionDetails} />
  );
};

EditSessionPage.getLayout = getLayout;

export default EditSessionPage;
