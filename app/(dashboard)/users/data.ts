import { getInvitations } from "@/server/queries/get-invitations";
import { getUsers } from "@/server/queries/get-users";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (search: string) => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => await getUsers(search, []),
  });
};

export const useGetInvitations = () => {
  return useQuery({
    queryKey: ["invitations"],
    queryFn: async () => await getInvitations([]),
  });
};
