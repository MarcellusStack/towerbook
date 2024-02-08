export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  /* const user = await getUserOverview(userId, ["admin"]); */

  return "Tower Duty Plan";
}
