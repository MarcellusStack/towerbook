import { useQuery } from "@tanstack/react-query";

import { getSettingsDashboard } from "@settings/_actions";

export const useGetSettingsDashboard = () => {
  return useQuery({
    queryKey: ["settings-dashboard"],
    queryFn: async () => await getSettingsDashboard(),
  });
};
