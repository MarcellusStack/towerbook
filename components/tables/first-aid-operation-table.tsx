"use client";

import { Group, ThemeIcon, Badge } from "@mantine/core";
import { IconAmbulance, IconFirstAidKit } from "@tabler/icons-react";
import { convertDate } from "@utils/index";
import { deleteFirstAidOperation } from "@server/actions/delete-first-aid-operation";
import {
  status as firstAidOperationStatus,
  tableColumnProps,
} from "@/constants";
import { TableLoader } from "@components/loader/table-loader";
import { useGetFirstAidOperations } from "@/data/protocols";
import { useSearchParams } from "next/navigation";
import { MantineTable } from "@components/mantine-table";
import { DeleteActionIcon } from "@components/delete-action-icon";
import { ViewActionIcon } from "@components/view-action-icon";
import { UpdateModalActionIcon } from "@components/update-modal-action-icon";
import { UpdateFirstAidOperationForm } from "@/app/(dashboard)/protocols/first-aid-operation/_components/update-first-aid-operation-form";

export const FirstAidOperationTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data: operations, isPending } = useGetFirstAidOperations(
    search as string
  );

  if (isPending || !operations) return <TableLoader />;
  return (
    <>
      <MantineTable
        records={operations || []}
        columns={[
          {
            accessor: "date",
            title: "Datum",
            render: ({ date }) => <>{convertDate(date)}</>,
            ...tableColumnProps,
          },
          {
            accessor: "type",
            title: "Typ",
            render: ({ type }) => (
              <>
                {type === "big" ? (
                  <ThemeIcon variant="subtle" color="black">
                    <IconAmbulance style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                ) : (
                  <ThemeIcon variant="subtle" color="black">
                    <IconFirstAidKit style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                )}
              </>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "status",
            title: "Status",
            render: ({ status }) => (
              <Badge color={firstAidOperationStatus[status].color}>
                {firstAidOperationStatus[status].label}
              </Badge>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "tower",
            title: "Turm",
            render: ({ tower }) => (
              <>
                {tower.name} {tower.number}
              </>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "helper",
            title: "Ersthelfer",
            render: ({ helper }) => (
              <>
                {helper.length > 0 &&
                  `${helper[0].firstName} ${helper[0].lastName}`}
              </>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "guardLeader",
            title: "Wachleiter",
            render: ({ guardLeader }) => (
              <>
                {guardLeader.firstName} {guardLeader.lastName}
              </>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "actions",
            title: "Aktionen",
            width: "0%",
            render: (operation) => (
              <Group gap={0} justify="flex-end">
                <ViewActionIcon
                  href={`/protocols/first-aid-operation/${operation.id}`}
                />
                <UpdateModalActionIcon
                  model="Erste-Hilfe-Einsatz"
                  modalContent={
                    <UpdateFirstAidOperationForm operation={operation} />
                  }
                />
                <DeleteActionIcon
                  id={operation.id}
                  action={deleteFirstAidOperation}
                  model="Erste-Hilfe-Einsatz"
                />
              </Group>
            ),
            ...tableColumnProps,
          },
        ]}
        storeKey="first-aid-operation-table"
      />
    </>
  );
};
