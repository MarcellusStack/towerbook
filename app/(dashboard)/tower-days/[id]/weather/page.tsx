import { getTowerDayWeather } from "@/server/queries/get-tower-day-weather";
import { TowerDayWeatherForm } from "@/components/forms/tower-day-weather-form";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const towerday = await getTowerDayWeather(id, ["admin"]);

  return <TowerDayWeatherForm towerday={towerday} />;
}
