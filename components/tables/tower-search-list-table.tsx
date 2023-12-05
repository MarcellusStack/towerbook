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
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconPencil,
  IconTrash,
  IconUserCheck,
  IconUserX,
} from "@tabler/icons-react";
import Link from "next/link";
import { convertDate, convertTime } from "@utils/index";
import { DeleteModalAction } from "@components/delete-modal-action";
import { deleteSearchList } from "@server/actions/delete-search-list";
import { ExtendSearchListWithTowerProps } from "@server/queries/get-search-list";

export const TowerSearchListTableRow = ({
  searchlist,
}: {
  searchlist: ExtendSearchListWithTowerProps;
}) => {
  return (
    <TableTr key={searchlist.id}>
      <TableTd>{convertDate(searchlist.date)}</TableTd>
      <TableTd>{convertTime(searchlist.timeSearched)}</TableTd>
      <TableTd>
        <Text size="sm">
          {searchlist.firstName} {searchlist.lastName}
        </Text>
      </TableTd>
      <TableTd>
        {searchlist.handOver ? (
          <ThemeIcon color="green" variant="light">
            <IconUserCheck
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ThemeIcon>
        ) : (
          <ThemeIcon color="red" variant="light">
            <IconUserX style={{ width: "70%", height: "70%" }} stroke={1.5} />
          </ThemeIcon>
        )}
      </TableTd>
      <TableTd>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            size="md"
            component={Link}
            href={`/protocols/search-list/${searchlist.id}`}
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
                      id={searchlist.id}
                      action={deleteSearchList}
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

export const TowerSearchListTable = ({
  searchlists,
}: {
  searchlists: ExtendSearchListWithTowerProps[];
}) => {
  return (
    <>
      <Table verticalSpacing="sm" striped withTableBorder>
        <TableThead>
          <TableTr>
            <TableTh>Datum</TableTh>
            <TableTh>Uhrzeit gesucht</TableTh>
            <TableTh>Name</TableTh>
            <TableTh>Übergeben</TableTh>
            <TableTh />
          </TableTr>
        </TableThead>
        <TableTbody>
          {searchlists.map((searchlist) => (
            <TowerSearchListTableRow searchlist={searchlist} />
          ))}
        </TableTbody>
      </Table>
    </>
  );
};
