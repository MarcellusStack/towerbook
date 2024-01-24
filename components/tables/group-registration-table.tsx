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
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { convertDate, convertTime } from "@utils/index";
import { DeleteModalAction } from "@components/delete-modal-action";
import { type GroupRegistrationProps } from "@server/queries/get-group-registrations";
import { deleteGroupRegistration } from "@/server/actions/delete-group-registration";
import { useSearchParams } from "next/navigation";
import { TableLoader } from "@components/loader/table-loader";
import { useGetGroupRegistrations } from "@/data/protocols";

export const GroupRegistrationTableRow = ({
  group,
}: {
  group: GroupRegistrationProps;
}) => {
  return (
    <TableTr key={group.id}>
      <TableTd>{convertDate(group.date)}</TableTd>
      <TableTd>{convertTime(group.time)}</TableTd>
      <TableTd>
        <Text size="sm">{group.name}</Text>
      </TableTd>
      <TableTd>
        <Text size="sm">{group.count}</Text>
      </TableTd>
      <TableTd>
        <Text size="sm">
          {group.supervisorFirstName} {group.supervisorLastName}
        </Text>
      </TableTd>
      <TableTd>
        <Text size="sm">
          {group.tower.name} {group.tower.number}
        </Text>
      </TableTd>
      <TableTd>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            size="md"
            component={Link}
            href={`/protocols/group-registration/${group.id}`}
            variant="subtle"
          >
            <IconPencil style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            onClick={() => {
              modals.open({
                title: "Sucheintrag löschen",
                children: (
                  <>
                    <DeleteModalAction
                      id={group.id}
                      action={deleteGroupRegistration}
                      model="Sucheintrag"
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

export const GroupRegistrationTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data: groups, isPending } = useGetGroupRegistrations(
    search as string
  );

  if (isPending || !groups) return <TableLoader />;
  return (
    <>
      <Table verticalSpacing="sm" striped withTableBorder>
        <TableThead>
          <TableTr>
            <TableTh>Datum</TableTh>
            <TableTh>Uhrzeit</TableTh>
            <TableTh>Gruppenname</TableTh>
            <TableTh>Anzahl</TableTh>
            <TableTh>Betreuer</TableTh>
            <TableTh>Turm</TableTh>
            <TableTh />
          </TableTr>
        </TableThead>
        <TableTbody>
          {groups.map((group) => (
            <GroupRegistrationTableRow key={group.id} group={group} />
          ))}
        </TableTbody>
      </Table>
    </>
  );
};
