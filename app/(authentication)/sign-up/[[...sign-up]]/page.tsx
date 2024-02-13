import { SignUp } from "@clerk/nextjs";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Skeleton } from "@mantine/core";
import { CustomSignUp } from "@sign-up/_components/custom-sign-up";

export const dynamic = "force-dynamic";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { __clerk_ticket } = searchParams;
  return (
    <>
      <ClerkLoading>
        <Skeleton w={450} h={550} />
      </ClerkLoading>
      <ClerkLoaded>
        {__clerk_ticket ? <CustomSignUp /> : <SignUp />}
      </ClerkLoaded>
    </>
  );
}
