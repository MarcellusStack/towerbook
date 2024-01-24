import { getOrganizationSettings } from "@/server/queries/organization";
import { useQuery } from "@tanstack/react-query";

export const useGetOrganizationSettings = () => {
  return useQuery({
    queryKey: ["organization"],
    queryFn: async () => await getOrganizationSettings(),
  });
};
