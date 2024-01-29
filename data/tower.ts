import { useQuery } from "@tanstack/react-query";
import {
  getTowerOverview,
  getTowerTowerDays,
  getTowers,
} from "@server/queries/tower";
import { getTower } from "@server/queries/get-tower";
import { getTowerFirstAidOperations } from "@/server/queries/get-tower-first-aid-operations";
import { getTowerSearchLists } from "@/server/queries/get-tower-search-list";
import { getTowerGroupRegistrations } from "@/server/queries/get-tower-group-registrations";

export const useGetTowers = (search: string) => {
  return useQuery({
    queryKey: ["towers", search],
    queryFn: async () => await getTowers(search, []),
  });
};

export const useGetTowerOverview = (id: string) => {
  return useQuery({
    queryKey: ["tower-overview", id],
    queryFn: async () => await getTowerOverview(id, []),
  });
};

export const useGetTower = (id: string) => {
  return useQuery({
    queryKey: ["tower", id],
    queryFn: async () => await getTower(id, []),
  });
};

export const useGetTowerTowerDays = (id: string) => {
  return useQuery({
    queryKey: ["towerdays", id],
    queryFn: async () => await getTowerTowerDays(id, []),
  });
};

export const useGetTowerFirstAidOperations = (id: string) => {
  return useQuery({
    queryKey: ["tower-first-aid-operations", id],
    queryFn: async () => await getTowerFirstAidOperations(id, []),
  });
};

export const useGetTowerSearchLists = (id: string) => {
  return useQuery({
    queryKey: ["tower-searchlists", id],
    queryFn: async () => await getTowerSearchLists(id, []),
  });
};

export const useGetTowerGroupRegistrations = (id: string) => {
  return useQuery({
    queryKey: ["tower-group-registrations", id],
    queryFn: async () => await getTowerGroupRegistrations(id, []),
  });
};
