import { getFirstAidOperation } from "@/server/queries/get-first-aid-operation";
import { getFirstAidOperations } from "@/server/queries/get-first-aid-operations";
import { useQuery } from "@tanstack/react-query";

export const useGetFirstAidOperations = (search: string) => {
  return useQuery({
    queryKey: ["first-aid-operations"],
    queryFn: async () => await getFirstAidOperations(search, []),
  });
};

export const useGetFirstAidOperation = (id: string) => {
  return useQuery({
    queryKey: ["first-aid-operation", id],
    queryFn: async () => await getFirstAidOperation(id, []),
  });
};
