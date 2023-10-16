import RoleBadge from "@components/role-badge";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import { getUser } from "@server/queries/get-user";
import { UserTabs } from "@components/user-tabs";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
  const { userId } = params;
  const user = await getUser(userId, ["admin"]);
  return (
    <>
      <SecondaryAppHeading
        title={`Benutzer`}
        childName={`${user.firstName} ${user.lastName}`}
        extraInfo={<RoleBadge user={user} />}
      />
      <UserTabs />
      {children}
    </>
  );
}
