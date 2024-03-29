"use client";
import { Group, Text } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { TableLoader } from "@components/loader/table-loader";
import { MantineTable } from "@components/mantine-table";
import { tableColumnProps } from "@/constants";
import { useGetPermissions } from "@permissions/_data";
import { deletePermission } from "@permissions/_actions";
import { ViewActionIcon } from "@/components/view-action-icon";
import { DeleteActionIcon } from "@/components/delete-action-icon";
import { UpdateModalActionIcon } from "@/components/update-modal-action-icon";
import { UpdatePermissionForm } from "@permissions/_components/update-permission-form";

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
          render: (permission) => (
            <Group gap={0} justify="flex-end">
              <ViewActionIcon href={`/settings/permissions/${permission.id}`} />
              <UpdateModalActionIcon
                model="Berechtigung"
                modalContent={<UpdatePermissionForm permission={permission} />}
              />
              <DeleteActionIcon
                id={permission.id}
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
