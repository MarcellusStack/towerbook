import { useQuery } from "@tanstack/react-query";
import { getUserPermission } from "@users/[id]/permission/_actions";

export const useGetUserPermission = (id: string) => {
  return useQuery({
    queryKey: ["user-permission", id],
    queryFn: async () => getUserPermission(id, []),
  });
};
