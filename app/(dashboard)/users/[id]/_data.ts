import { useQuery } from "@tanstack/react-query";
import { getUserLayout, getUserOverview } from "@users/[id]/_actions";

export const useGetUserLayout = (id: string) => {
  return useQuery({
    queryKey: ["user-layout", id],
    queryFn: async () => await getUserLayout(id),
  });
};

export const useGetUserOverview = (id: string) => {
  return useQuery({
    queryKey: ["user-overview", id],
    queryFn: async () => getUserOverview(id),
  });
};
