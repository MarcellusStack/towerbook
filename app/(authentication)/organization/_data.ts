import { useQuery } from "@tanstack/react-query";

import { getInvitations } from "@organization/_actions";

export const useGetInvitations = () => {
  return useQuery({
    queryKey: ["invitations"],
    queryFn: async () => await getInvitations(),
  });
};
