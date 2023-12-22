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

export const getSessions = async ({ eventId, offset = 0, limit = 10 }:ISessiosRequest): Promise<ISessiosResponse> => {
  const response = await queryClient.get(`/get-sessions?event_id=${eventId}&offset=${offset}&limit=${limit}`);
  return response.data;
};
