import { notFound } from "next/navigation";
import { getTowerDayTodo } from "@/server/queries/get-tower-day-todo";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { TowerdayTodo } from "@/components/towerdays/towerday/towerday-todo";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  const towerday = await queryClient.fetchQuery({
    queryKey: ["towerday-todo", id],
    queryFn: async () => await getTowerDayTodo(id),
    staleTime: 0,
  });

  if (!towerday) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TowerdayTodo />
    </HydrationBoundary>
  );
}
