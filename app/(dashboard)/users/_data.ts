import { getInvitations } from "@/server/queries/get-invitations";
import { getUsers } from "@/server/queries/get-users";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (search: string) => {
  return useQuery({
    queryKey: ["users", search],
    queryFn: async () => await getUsers(search),
  });
};

export const useGetInvitations = (search: string) => {
  return useQuery({
    queryKey: ["invitations", search],
    queryFn: async () => await getInvitations(search),
  });
};
