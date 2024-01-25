import { useQuery } from "@tanstack/react-query";
import { getAccomodations } from "@accomodations/_actions";

export const useGetAccomodations = () => {
  return useQuery({
    queryKey: ["accomodations"],
    queryFn: async () => await getAccomodations("", []),
  });
};
