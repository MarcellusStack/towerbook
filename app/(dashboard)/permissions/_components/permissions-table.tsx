"use client";
import { Group, ActionIcon, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { DeleteModalAction } from "@components/delete-modal-action";
import { useSearchParams } from "next/navigation";
import { TableLoader } from "@components/loader/table-loader";
import { MantineTable } from "@components/mantine-table";
import { tableColumnProps } from "@/constants";
import { useGetPermissions } from "@permissions/_data";
import { deletePermission } from "@permissions/_actions";

export const PermissionsTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data: permissions, isPending } = useGetPermissions(search as string);

  if (isPending) return <TableLoader />;

  return (
    <MantineTable
      records={permissions || []}
      columns={[
        {
          accessor: "name",
          title: "Name",
          ...tableColumnProps,
        },
        {
          accessor: "description",
          title: "Beschreibung",
          ...tableColumnProps,
        },
        {
          accessor: "users",
          title: "Benutzer",
          render: ({ users }) => <Text>{users.length}</Text>,
          ...tableColumnProps,
        },

        {
          accessor: "actions",
          title: "Aktionen",
          width: "0%",
          render: ({ id }) => (
            <Group gap={0} justify="flex-end">
              <ActionIcon
                component={Link}
                href={`/permissions/${id}`}
                variant="subtle"
              >
                <IconPencil
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon
                onClick={() => {
                  modals.open({
                    title: "Berechtigung löschen",
                    children: (
                      <>
                        <DeleteModalAction
                          id={id}
                          action={deletePermission}
                          model="Berechtiung"
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
      storeKey="permissions-table"
    />
  );
};
