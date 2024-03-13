"use client";
import { Group, ActionIcon, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { DeleteModalAction } from "@components/delete-modal-action";
import { useSearchParams } from "next/navigation";
import { TableLoader } from "@components/loader/table-loader";
import { MantineTable } from "@components/mantine-table";
import { tableColumnProps } from "@/constants";
import { useGetPermissions } from "@permissions/_data";
import { deletePermission } from "@permissions/_actions";
import { ViewActionIcon } from "@/components/view-action-icon";
import { DeleteActionIcon } from "@/components/delete-action-icon";
import { UpdateModalActionIcon } from "@/components/update-modal-action-icon";

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
              <ViewActionIcon href={`/settings/permissions/${id}`} />
              <UpdateModalActionIcon
                model="Berechtigung"
                modalContent={
                  <UpdateAccomodationForm accomodation={accomodation} />
                }
              />
              <DeleteActionIcon
                id={id}
                model="Berechtigung"
                action={deletePermission}
              />
            </Group>
          ),
          ...tableColumnProps,
        },
      ]}
      storeKey="permissions-table"
    />
  );
};
