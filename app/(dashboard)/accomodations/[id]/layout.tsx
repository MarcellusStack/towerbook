import { notFound } from "next/navigation";
import { getAccomodation } from "@accomodations/[id]/_actions";
import { AccomodationLayout } from "@accomodations/[id]/_components/accomodation-layout";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;

  const queryClient = new QueryClient();

  const accomodation = await queryClient.fetchQuery({
    queryKey: ["accomodation", id],
    queryFn: async () => await getAccomodation(id, []),
    staleTime: 0,
  });

  if (!accomodation) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AccomodationLayout>{children}</AccomodationLayout>;
    </HydrationBoundary>
  );
}
