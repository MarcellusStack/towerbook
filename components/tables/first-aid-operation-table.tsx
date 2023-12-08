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
  rem,
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
import { convertDate, convertTime } from "@utils/index";
import { DeleteModalAction } from "@components/delete-modal-action";
import { ExtendFirstAidOperationsWithRelationProps } from "@server/queries/get-first-aid-operations";
import { deleteFirstAidOperation } from "@server/actions/delete-first-aid-operation";
import { status } from "@/constants";

export const FirstAidOperationTableRow = ({
  operation,
}: {
  operation: ExtendFirstAidOperationsWithRelationProps;
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

export const FirstAidOperationTable = ({
  operations,
}: {
  operations: ExtendFirstAidOperationsWithRelationProps[];
}) => {
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
    </>
  );
};
