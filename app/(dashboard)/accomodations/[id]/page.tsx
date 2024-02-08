import { notFound } from "next/navigation";
import { getAccomodationBookings } from "@accomodations/[id]/_actions";
import { BookingCalendar } from "@accomodations/[id]/_components/booking-calendar";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  const accomodation = await queryClient.fetchQuery({
    queryKey: ["accomodation-bookings", id],
    queryFn: async () => await getAccomodationBookings(id, []),
    staleTime: 0,
  });

  if (!accomodation) {
    notFound();
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BookingCalendar />
      </HydrationBoundary>
    </>
  );
}
