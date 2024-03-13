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
import { status, tableColumnProps } from "@/constants";
import { TableLoader } from "@components/loader/table-loader";
import { useGetFirstAidOperations } from "@/data/protocols";
import { useSearchParams } from "next/navigation";
import { MantineTable } from "@components/mantine-table";

export const FirstAidOperationTableRow = ({
  operation,
}: {
  operation: FirstAidOperationProps;
}) => {
  return (
    <TableTr key={operation.id}>
      <TableTd>{convertDate(operation.date)}</TableTd>
      <TableTd>
        {operation.type === "big" ? (
          <ThemeIcon variant="subtle" color="black">
            <IconAmbulance style={{ width: "70%", height: "70%" }} />
          </ThemeIcon>
        ) : (
          <ThemeIcon variant="subtle" color="black">
            <IconFirstAidKit style={{ width: "70%", height: "70%" }} />
          </ThemeIcon>
        )}
      </TableTd>
      <TableTd>
        <Badge color={status[operation.status].color}>
          {status[operation.status].label}
        </Badge>
      </TableTd>
      <TableTd>
        <Text size="sm">
          {operation.tower.name} {operation.tower.number}
        </Text>
      </TableTd>
      <TableTd>
        <Text size="sm">
          {operation.guardLeader.firstName} {operation.guardLeader.lastName}
        </Text>
      </TableTd>
      <TableTd>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            size="md"
            component={Link}
            href={`/protocols/first-aid-operation/${operation.id}`}
            variant="subtle"
          >
            <IconPencil style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              modals.open({
                title: "Einsatz löschen",
                children: (
                  <>
                    <DeleteModalAction
                      id={operation.id}
                      action={deleteFirstAidOperation}
                      model="Einsatz"
                    />
                  </>
                ),
              });
            }}
            size="md"
            variant="subtle"
            color="red"
          >
            <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </TableTd>
    </TableTr>
  );
};

export const FirstAidOperationTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data: operations, isPending } = useGetFirstAidOperations(
    search as string
  );

  if (isPending || !operations) return <TableLoader />;
  return (
    <>
      <Table verticalSpacing="sm" striped withTableBorder>
        <TableThead>
          <TableTr>
            <TableTh>Datum</TableTh>
            <TableTh>Typ</TableTh>
            <TableTh>Status</TableTh>
            <TableTh>Turm</TableTh>
            <TableTh>Wachleiter</TableTh>
            <TableTh />
          </TableTr>
        </TableThead>
        <TableTbody>
          {operations.map((operation) => (
            <FirstAidOperationTableRow
              key={operation.id}
              operation={operation}
            />
          ))}
        </TableTbody>
      </Table>
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
                )}{" "}
              </>
            ),
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
                <ViewActionIcon href={`/towers/${id}`} />
                <DeleteActionIcon id={id} action={deleteTower} model="Turm" />
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
