import { notFound } from "next/navigation";
import { getAccomodation } from "@/services/accomodation/queries";
import { BookingCalendar } from "@/services/accomodation/components/booking-calendar";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const accomodation = await getAccomodation(id, []);

  if (!accomodation) {
    notFound();
  }

  return (
    <>
      <BookingCalendar bookings={accomodation.bookings} />
    </>
  );
}
