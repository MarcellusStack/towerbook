"use client";
import { convertDate, convertTime } from "@/utils";
import {
  ActionIcon,
  Group,
  TableTd,
  TableTr,
  Text,
} from "@mantine/core";
import { SearchList } from "@prisma/client";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";

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
        <Text size="sm">{convertTime(searchlist.timeFound)}</Text>
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
            <IconPencil />
          </ActionIcon>
          <ActionIcon
            /*  onClick={() => {
              modals.open({
                title: "Turm löschen",
                children: (
                  <>
                    <DeleteModalAction
                      id={tower.id}
                      action={deleteTower}
                      model="Turm"
                    />
                  </>
                ),
              });
            }} */
            size="sm"
            variant="subtle"
            color="red"
          >
            <IconTrash />
          </ActionIcon>
        </Group>
      </TableTd>
    </TableTr>
  );
};
