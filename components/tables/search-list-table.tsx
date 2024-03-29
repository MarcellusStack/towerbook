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
import { IconPencil, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { convertDate, convertTime } from "@utils/index";
import { DeleteModalAction } from "@components/delete-modal-action";
import { deleteSearchList } from "@server/actions/delete-search-list";

import { status } from "@/constants";
import { useSearchParams } from "next/navigation";
import { TableLoader } from "@components/loader/table-loader";
import { useGetSearchLists } from "@/data/protocols";
import { type SearchListProps } from "@/server/queries/get-search-lists";

export const SearchListTableRow = ({
  searchlist,
}: {
  searchlist: SearchListProps;
}) => {
  return (
    <TableTr key={searchlist.id}>
      <TableTd>{convertDate(searchlist.date)}</TableTd>
      <TableTd>{convertTime(searchlist.timeSearched)}</TableTd>
      <TableTd>
        <Badge color={status[searchlist.status].color}>
          {status[searchlist.status].label}
        </Badge>
      </TableTd>
      <TableTd>
        <Text size="sm">
          {searchlist.firstName} {searchlist.lastName}
        </Text>
      </TableTd>
      <TableTd>
        <Text size="sm">
          {searchlist.tower.name} {searchlist.tower.number}
        </Text>
      </TableTd>
      <TableTd>
        {searchlist.handOverTo ? (
          <ThemeIcon color="green" variant="light">
            <IconCheck style={{ width: "70%", height: "70%" }} />
          </ThemeIcon>
        ) : (
          <ThemeIcon color="red" variant="light">
            <IconX style={{ width: "70%", height: "70%" }} />
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
            <IconPencil style={{ width: "70%", height: "70%" }}  />
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
            <IconTrash style={{ width: "70%", height: "70%" }}  />
          </ActionIcon>
        </Group>
      </TableTd>
    </TableTr>
  );
};

export const SearchListTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data: searchlists, isPending } = useGetSearchLists(search as string);

  if (isPending || !searchlists) return <TableLoader />;
  return (
    <>
      <Table verticalSpacing="sm" striped withTableBorder>
        <TableThead>
          <TableTr>
            <TableTh>Datum</TableTh>
            <TableTh>Uhrzeit gesucht</TableTh>
            <TableTh>Status</TableTh>
            <TableTh>Name</TableTh>
            <TableTh>Turm</TableTh>
            <TableTh>Übergeben</TableTh>
            <TableTh />
          </TableTr>
        </TableThead>
        <TableTbody>
          {searchlists.map((searchlist) => (
            <SearchListTableRow key={searchlist.id} searchlist={searchlist} />
          ))}
        </TableTbody>
      </Table>
    </>
  );
};
