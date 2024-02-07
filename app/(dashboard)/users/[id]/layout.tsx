import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getUserLayout } from "./_actions";
import { notFound } from "next/navigation";
import { UserLayout } from "@user/[id]/_components/user-layout";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;

  const queryClient = new QueryClient();

  const user = await queryClient.fetchQuery({
    queryKey: ["user-layout", id],
    queryFn: async () => await getUserLayout(id),
    staleTime: 0,
  });

  if (!user) {
    notFound();
  }
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserLayout>{children}</UserLayout>
      </HydrationBoundary>
    </>
  );
}
