import { TowerdayDashboard } from "@towerdays/[id]/_components/towerday-dashboard";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  /*  const towerday = await getTowerDayWeather(id, ["admin"]); */

  /* if (!towerday) {
    notFound();
  } */

  return <TowerdayDashboard />;
}
