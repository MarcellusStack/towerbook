import { getFirstAidOperation } from "@server/queries/get-first-aid-operation";
import { FirstAidOperationBigForm } from "@/components/forms/first-aid-operation-big-form";
import { TableOfContents } from "@components/table-of-contents";
import { FirstAidOperationSmallForm } from "@components/forms/first-aid-operation-small-form";
import { notFound } from "next/navigation";
import { FirstAidOperationForm } from "@/components/protocols/first-aid-operation-form";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const queryClient = new QueryClient();

  const operation = await queryClient.fetchQuery({
    queryKey: ["first-aid-operation", id],
    queryFn: async () => await getFirstAidOperation(id),
    staleTime: 0,
  });

  if (!operation) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FirstAidOperationForm />
    </HydrationBoundary>
  );
}
