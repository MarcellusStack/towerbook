import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import { Skeleton } from "@mantine/core";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <ClerkLoading>
        <Skeleton w={450} h={550} />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
    </>
  );
}
