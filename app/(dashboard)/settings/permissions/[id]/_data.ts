import { useQuery } from "@tanstack/react-query";
import { getPermission } from "@permissions/[id]/_actions";

export const useGetPermission = (id: string) => {
  return useQuery({
    queryKey: ["permission", id],
    queryFn: async () => await getPermission(id),
  });
};
