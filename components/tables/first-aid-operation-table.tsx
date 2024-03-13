"use client";

import {
  Table,
  Group,
  Text,
  ActionIcon,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  ThemeIcon,
  Badge,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconAmbulance,
  IconFirstAidKit,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { convertDate } from "@utils/index";
import { DeleteModalAction } from "@components/delete-modal-action";
import { type FirstAidOperationProps } from "@server/queries/get-first-aid-operations";
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
import { EditActionIcon } from "../update-modal-action-icon";

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
            render: ({ id }) => (
              <Group gap={0} justify="flex-end">
                <ViewActionIcon href={`/protocols/first-aid-operation/${id}`} />
                <EditActionIcon
                  model="Unterkunft"
                  modalContent={
                    <UpdateAccomodationForm accomodation={accomodation} />
                  }
                />
                <DeleteActionIcon
                  id={id}
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
