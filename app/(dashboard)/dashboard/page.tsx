import { auth, currentUser } from "@clerk/nextjs";
import { PrimaryAppHeading } from "@components/typography/primary-app-heading";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await currentUser();
  console.log(user);
  return (
    <>
      <PrimaryAppHeading title="Dashboard" />
    </>
  );
}
