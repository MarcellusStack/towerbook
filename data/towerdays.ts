import { getTowerDays } from "@/server/queries/tower-days";
import { useQuery } from "@tanstack/react-query";

export const useGetTowerDays = (search: string) => {
  return useQuery({
    queryKey: ["tower-days"],
    queryFn: async () => await getTowerDays(search, []),
    staleTime: 0,
  });
};
