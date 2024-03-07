import { useQuery } from "@tanstack/react-query";
import { getUserLayout, getUserDashboard } from "@users/[id]/_actions";

export const useGetUserLayout = (id: string) => {
  return useQuery({
    queryKey: ["user-layout", id],
    queryFn: async () => await getUserLayout(id),
  });
};

export const useGetUserDashboard = (id: string) => {
  return useQuery({
    queryKey: ["user-dashboard", id],
    queryFn: async () => getUserDashboard(id),
  });
};
