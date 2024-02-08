import { useQuery } from "@tanstack/react-query";
import { getUserSettingsAccount } from "@settings/account/_actions";

export const useGetUserSettingsAccount = () => {
  return useQuery({
    queryKey: ["user-settings-account"],
    queryFn: async () => await getUserSettingsAccount(),
  });
};
