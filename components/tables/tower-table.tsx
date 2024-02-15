"use client";
import { Group, ActionIcon, ThemeIcon, Badge } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { DeleteModalAction } from "@components/delete-modal-action";
import { deleteTower } from "@server/actions/delete-tower";
import { useGetTowers } from "@data/tower";
import { useSearchParams } from "next/navigation";
import { TableLoader } from "@components/loader/table-loader";
import { MantineTable } from "@components/mantine-table";
import { tableColumnProps } from "@/constants";
import { TowerStatus } from "@towers/_components/tower-status";
import { EditLink } from "@components/edit-link";

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
          render: ({ id }) => (
            <Group gap={0} justify="flex-end">
              <EditLink href={`/towers/${id}`} />
              <ActionIcon
                onClick={() => {
                  modals.open({
                    title: "Turm löschen",
                    children: (
                      <>
                        <DeleteModalAction
                          id={id}
                          action={deleteTower}
                          model="Turm"
                        />
                      </>
                    ),
                  });
                }}
                variant="subtle"
                color="red"
              >
                <IconTrash
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>
          ),
          ...tableColumnProps,
        },
      ]}
      storeKey="towers-table"
    />
  );
}
