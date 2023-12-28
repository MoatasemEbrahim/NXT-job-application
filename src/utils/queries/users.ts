import queryClient from "@/utils/queries/queryClient";
import { User } from "@/types/user";
interface ISessiosRequest {
  eventId: number;
  offset?: number;
  limit?: number
}

export const getUsers = async ({ eventId, offset = 0, limit = 1000,  }:ISessiosRequest): Promise<User[]> => {
  const response = await queryClient.get(`/get-users?event_id=${eventId}&offset=${offset}&limit=${limit}`);
  return response.data;
};

export const createUser = async ({ eventId, user }:{ eventId: number, user:User}): Promise<User> => {
  const response = await queryClient.post("/create-users", {
    event_id: eventId,
    ...user
  });
  return response.data;
};


