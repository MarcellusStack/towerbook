import UserDashboard from "@components/user-dashboard";
import { getUserOverview } from "@/server/queries/get-user-overview";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await getUserOverview(id, ["admin"]);

  return <UserDashboard user={user} />;
}
