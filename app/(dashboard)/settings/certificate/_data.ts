import { useQuery } from "@tanstack/react-query";
import { getUserSettingsCertificate } from "@settings/certificate/_actions";

export const useGetUserSettingsCertificate = () => {
  return useQuery({
    queryKey: ["user-settings-certificate"],
    queryFn: async () => getUserSettingsCertificate(),
  });
};
