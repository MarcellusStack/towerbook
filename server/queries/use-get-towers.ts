import { useQuery } from "@tanstack/react-query";
import { getTowers } from "@server/queries/tower";

export const useGetTowers = (search: string) => {
  return useQuery({
    queryKey: ["towers", search],
    queryFn: async () => await getTowers(search, []),
  });
};
