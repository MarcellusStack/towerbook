"use client";
import { Group, Badge } from "@mantine/core";
import Image from "next/image";
import { deleteTower } from "@server/actions/delete-tower";
import { useGetTowers } from "@data/tower";
import { useSearchParams } from "next/navigation";
import { TableLoader } from "@components/loader/table-loader";
import { MantineTable } from "@components/mantine-table";
import { tableColumnProps } from "@/constants";
import { TowerStatus } from "@towers/_components/tower-status";
import { ViewActionIcon } from "@/components/view-action-icon";
import { DeleteActionIcon } from "../delete-action-icon";
import { UpdateModalActionIcon } from "@components/update-modal-action-icon";
import { UpdateTowerForm } from "@towers/_components/update-tower-form";

export function TowerTable() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data: towers, isPending } = useGetTowers(search as string);

  if (isPending) return <TableLoader />;

  return (
    <MantineTable
      records={towers || []}
      columns={[
        {
          accessor: "type",
          title: "Typ",
          render: ({ type }) => (
            <>
              {type === "tower" && (
                <Image
                  src="/tower.png"
                  width={28}
                  height={28}
                  style={{ opacity: 0.8 }}
                  alt="type icon"
                />
              )}
              {type === "quad" && (
                <Image
                  src="/quad.png"
                  width={28}
                  height={28}
                  style={{ opacity: 0.8 }}
                  alt="type icon"
                />
              )}
            </>
          ),
          ...tableColumnProps,
        },
        {
          accessor: "status",
          title: "Status",
          render: ({ status }) => <TowerStatus status={status} />,
          ...tableColumnProps,
        },
        {
          accessor: "main",
          title: "Haupt/Nebenturm",
          render: ({ main }) => (
            <Badge color="black" variant={main ? "filled" : "outline"}>
              {main ? "Hauptturm" : "Nebenturm"}
            </Badge>
          ),
          ...tableColumnProps,
        },
        {
          accessor: "name",
          title: "Name",
          ...tableColumnProps,
        },
        {
          accessor: "number",
          title: "Nummer",
          ...tableColumnProps,
        },
        {
          accessor: "location",
          title: "Standort",
          ...tableColumnProps,
        },
        {
          accessor: "actions",
          title: "Aktionen",
          width: "0%",
          render: (tower) => (
            <Group gap={0} justify="flex-end">
              <ViewActionIcon href={`/towers/${tower.id}`} />
              <UpdateModalActionIcon
                model="Turm"
                modalContent={
                  <UpdateTowerForm tower={tower} />
                }
              />
              <DeleteActionIcon id={tower.id} action={deleteTower} model="Turm" />
            </Group>
          ),
          ...tableColumnProps,
        },
      ]}
      storeKey="towers-table"
    />
  );
}
