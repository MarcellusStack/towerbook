import { useQuery } from "@tanstack/react-query";
import { getPermissions } from "@permissions/_actions";

export const useGetPermissions = (search: string) => {
  return useQuery({
    queryKey: ["permissions", search],
    queryFn: async () => await getPermissions(search),
  });
};
