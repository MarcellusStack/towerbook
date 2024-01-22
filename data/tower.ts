import { useQuery } from "@tanstack/react-query";
import { getTowerOverview, getTowers } from "@server/queries/tower";
import { getTower } from "@server/queries/get-tower";

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
