import queryClient from "@/utils/queries/queryClient";
import { Session } from "@/types/session";
interface ISessiosRequest {
  eventId: number;
  offset?: number;
  limit?: number
}

interface ISessiosResponse {
  count: number;
  is_last_offset: boolean;
  sessions: Session[];
}

interface IGetSessioRequest {
  sesssionId: number,
  eventId: number;
}

interface IPostSessioRequest {
  eventId: number;
  session: Record<string, undefined | number | string | Date | number[]>
}

export const getSessions = async ({ eventId, offset = 0, limit = 10 }:ISessiosRequest): Promise<ISessiosResponse> => {
  const response = await queryClient.get(`/get-sessions?event_id=${eventId}&offset=${offset}&limit=${limit}`);
  return response.data;
};

export const getSession = async ({ sesssionId, eventId }:IGetSessioRequest): Promise<Session> => {
  const response = await queryClient.get(`/session-details/${sesssionId}?event_id=${eventId}`);
  return response.data;
};

export const createSession = async ({ eventId, session }:IPostSessioRequest): Promise<Session> => {
  const response = await queryClient.post("/create-sessions", {
    event_id: eventId,
    ...session,
  });
  return response.data;
};
