import { useQuery } from "@tanstack/react-query";
import { getUserCertificate } from "@user/[id]/certificate/_actions";

export const useGetUserCertificate = (id: string) => {
  return useQuery({
    queryKey: ["user-certificate", id],
    queryFn: async () => getUserCertificate(id),
  });
};
