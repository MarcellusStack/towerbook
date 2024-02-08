import { useQuery } from "@tanstack/react-query";
import { getAccomodations } from "@accomodations/_actions";

export const useGetAccomodations = (search: string) => {
  return useQuery({
    queryKey: ["accomodations", search],
    queryFn: async () => await getAccomodations(search),
  });
};
