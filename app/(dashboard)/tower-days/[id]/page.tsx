export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  /*  const towerday = await getTowerDayWeather(id, ["admin"]); */

  /* if (!towerday) {
    notFound();
  } */

  return "Overview";
}
