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
import { GroupRegistrationProps } from "@server/queries/get-group-registrations";
import { deleteGroupRegistration } from "@/server/actions/delete-group-registration";
import { useParams } from "next/navigation";
import { TableLoader } from "@components/loader/table-loader";
import { useGetTowerGroupRegistrations } from "@/data/tower";

export const TowerGroupRegistrationTableRow = ({
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

export const TowerGroupRegistrationTable = () => {
  const { id } = useParams();

  const { data: groups, isPending } = useGetTowerGroupRegistrations(
    id as string
  );

  if (isPending) return <TableLoader />;
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
            <TableTh />
          </TableTr>
        </TableThead>
        <TableTbody>
          {groups &&
            groups.map((group) => (
              <TowerGroupRegistrationTableRow key={group.id} group={group} />
            ))}
        </TableTbody>
      </Table>
    </>
  );
};
