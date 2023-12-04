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
import { SearchList } from "@prisma/client";
import { deleteSearchList } from "@server/actions/delete-search-list";

export type SearchListProps = Pick<
  SearchList,
  | "id"
  | "date"
  | "timeSearched"
  | "firstName"
  | "lastName"
  | "timeFound"
  | "handOverTo"
  | "towerId"
>;

export const SearchlistTableRow = ({
  searchlist,
}: {
  searchlist: SearchListProps;
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
        <Text size="sm">{convertTime(searchlist.timeSearched)}</Text>
      </TableTd>
      <TableTd>
        <Text size="sm">{searchlist.handOverTo}</Text>
      </TableTd>
      <TableTd>
        <Group gap={0} justify="flex-end">
          <ActionIcon
            size="sm"
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
            size="sm"
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

export const SearchListTable = ({
  searchlists,
}: {
  searchlists: SearchListProps[];
}) => {
  return (
    <>
      <Table verticalSpacing="sm" striped withTableBorder>
        <TableThead>
          <TableTr>
            <TableTh>Datum</TableTh>
            <TableTh>Uhrzeit gesucht</TableTh>
            <TableTh>Name</TableTh>
            <TableTh>Turm</TableTh>
            <TableTh>Übergeben</TableTh>
            <TableTh />
          </TableTr>
        </TableThead>
        <TableTbody>
          {searchlists.map((searchlist) => (
            <SearchlistTableRow searchlist={searchlist} />
          ))}
        </TableTbody>
      </Table>
    </>
  );
};
