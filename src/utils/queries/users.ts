import queryClient from "@/utils/queries/queryClient";
import { User } from "@/types/user";
interface ISessiosRequest {
  eventId: number;
  offset?: number;
  limit?: number
}

interface ISessiosResponse {
  count: number;
  is_last_offset: boolean;
  users: User[];
}

export const getUsers = async ({ eventId, offset = 0, limit = 10,  }:ISessiosRequest): Promise<ISessiosResponse> => {
  const response = await queryClient.get(`/get-users?event_id=${eventId}&offset=${offset}&limit=${limit}`);
  return response.data;
};

