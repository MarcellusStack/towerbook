import { useQuery } from "@tanstack/react-query";
import { getUserAccount } from "@users/[id]/account/_actions";

export const useGetUserAccount = (id: string) => {
  return useQuery({
    queryKey: ["user-account", id],
    queryFn: async () => await getUserAccount(id, []),
  });
};
