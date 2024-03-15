"use client";

import {
  Group,
  ThemeIcon,
  Badge,
} from "@mantine/core";
import {
  IconAmbulance,
  IconFirstAidKit,
} from "@tabler/icons-react";
import { convertDate } from "@utils/index";
import { deleteFirstAidOperation } from "@server/actions/delete-first-aid-operation";
import {
  status as firstAidOperationStatus,
  tableColumnProps,
} from "@/constants";

import { useParams } from "next/navigation";
import { TableLoader } from "@components/loader/table-loader";
import { useGetTowerFirstAidOperations } from "@/data/tower";
import { ViewActionIcon } from "@components/view-action-icon";
import { MantineTable } from "@components/mantine-table";
import { UpdateModalActionIcon } from "../update-modal-action-icon";
import { DeleteActionIcon } from "../delete-action-icon";
import { UpdateTowerFirstAidOperationForm } from "@towers/[id]/first-aid-operation/_components/update-tower-first-aid-operation-form";

export const TowerFirstAidOperationTable = () => {
  const { id } = useParams();

  const { data: operations, isPending } = useGetTowerFirstAidOperations(
    id as string
  );

  if (isPending) return <TableLoader />;
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
                    <UpdateTowerFirstAidOperationForm operation={operation} />
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
        storeKey="tower-first-aid-operation-table"
      />
    </>
  );
};
