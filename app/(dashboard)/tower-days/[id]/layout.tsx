import { getTowerDayOverview } from "@/server/queries/get-tower-day-overview";
import { notFound } from "next/navigation";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Towerday } from "@/components/towerdays/towerday/towerday";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;

  const queryClient = new QueryClient();

  const towerday = await queryClient.fetchQuery({
    queryKey: ["towerday", id],
    queryFn: async () => await getTowerDayOverview(id, []),
    staleTime: 0,
  });

  if (!towerday) {
    notFound();
  }

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Towerday>{children}</Towerday>
      </HydrationBoundary>
    </>
  );
}
