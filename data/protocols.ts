import { getFirstAidOperation } from "@/server/queries/get-first-aid-operation";
import { getFirstAidOperations } from "@/server/queries/get-first-aid-operations";
import { getGroupRegistrations } from "@/server/queries/get-group-registrations";
import { getSearchLists } from "@/server/queries/get-search-lists";
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

export const useGetGroupRegistrations = (search: string) => {
  return useQuery({
    queryKey: ["group-registrations"],
    queryFn: async () => await getGroupRegistrations(search, []),
  });
};

export const useGetSearchLists = (search: string) => {
  return useQuery({
    queryKey: ["search-lists"],
    queryFn: async () => await getSearchLists(search, []),
  });
};
