import { getTowerDayDutyPlan } from "@/server/queries/get-tower-day-duty-plan";
import { getTowerDayIncident } from "@/server/queries/get-tower-day-incident";
import { getTowerDayMaterial } from "@/server/queries/get-tower-day-material";
import { getTowerDayOverview } from "@/server/queries/get-tower-day-overview";
import { getTowerDayTodo } from "@/server/queries/get-tower-day-todo";
import { getTowerDayWatchmanPlan } from "@/server/queries/get-tower-day-watchman-plan";
import { getTowerDayWeather } from "@/server/queries/get-tower-day-weather";
import { getTowerDays } from "@/server/queries/tower-days";
import { useQuery } from "@tanstack/react-query";

export const useGetTowerdays = (search: string) => {
  return useQuery({
    queryKey: ["tower-days"],
    queryFn: async () => await getTowerDays(search, []),
  });
};

export const useGetTowerdayOverview = (id: string) => {
  return useQuery({
    queryKey: ["towerday", id],
    queryFn: async () => await getTowerDayOverview(id, []),
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });
};

export const useGetTowerdayWatchmanPlan = (id: string) => {
  return useQuery({
    queryKey: ["towerday-watchman-plan", id],
    queryFn: async () => await getTowerDayWatchmanPlan(id, []),
  });
};

export const useGetTowerdayTodo = (id: string) => {
  return useQuery({
    queryKey: ["towerday-todo", id],
    queryFn: async () => await getTowerDayTodo(id, []),
  });
};

export const useGetTowerdayIncident = (id: string) => {
  return useQuery({
    queryKey: ["towerday-incident", id],
    queryFn: async () => await getTowerDayIncident(id, []),
  });
};

export const useGetTowerdayWeather = (id: string) => {
  return useQuery({
    queryKey: ["towerday-weather", id],
    queryFn: async () => await getTowerDayWeather(id, []),
  });
};

export const useGetTowerdayMaterial = (id: string) => {
  return useQuery({
    queryKey: ["towerday-material", id],
    queryFn: async () => await getTowerDayMaterial(id, []),
  });
};

export const useGetTowerdayDutyPlan = (id: string) => {
  return useQuery({
    queryKey: ["towerday-duty-plan", id],
    queryFn: async () => await getTowerDayDutyPlan(id, []),
  });
};
