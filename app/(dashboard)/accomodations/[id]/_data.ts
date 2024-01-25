import { useQuery } from "@tanstack/react-query";
import { getAccomodation, getAccomodationBookings } from "@accomodations/[id]/_actions";

export const useGetAccomodation = (id: string) => {
  return useQuery({
    queryKey: ["accomodation", id],
    queryFn: async () => await getAccomodation(id, []),
  });
};

export const useGetAccomodationBookings = (id: string) => {
  return useQuery({
    queryKey: ["accomodation-bookings", id],
    queryFn: async () => await getAccomodationBookings(id, []),
  });
};
