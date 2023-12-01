"use server";
import { roles } from "@/constants/roles";
import {
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  rem,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  Skeleton,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { capitalizeFirstLetter, convertDate, convertTime } from "@utils/index";
import Image from "next/image";
import { DeleteModalAction } from "@components/delete-modal-action";
import { deleteTower } from "@server/actions/delete-tower";
import {
  SearchListProps,
  SearchlistTableRow,
} from "@components/search-list-table-row";
import { getSearchLists } from "@/server/queries/get-search-lists";
import { unstable_noStore } from "next/cache";

export const SearchListTable = async () => {
  unstable_noStore();
  const searchlists = await getSearchLists("", []);

  return (
    <>
      <Table verticalSpacing="sm" striped withTableBorder>
        <TableThead>
          <TableTr>
            <TableTh>Datum</TableTh>
            <TableTh>Uhrzeit gesucht</TableTh>
            <TableTh>Name</TableTh>
            <TableTh>Turm</TableTh>
            <TableTh>Status</TableTh>
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
