import { useQuery } from "@tanstack/react-query";
import { getUserDashboard } from "@dashboard/_actions";

export const useGetUserDashboard = () => {
  return useQuery({
    queryKey: ["user-dashboard"],
    queryFn: async () => await getUserDashboard(),
  });
};
