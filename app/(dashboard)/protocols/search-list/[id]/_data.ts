import { getSearchList } from "@/server/queries/get-search-list";
import { useQuery } from "@tanstack/react-query";

export const useGetSearchList = (id: string) => {
  return useQuery({
    queryKey: ["searchlist", id],
    queryFn: async () => await getSearchList(id),
  });
};
