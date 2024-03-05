"use client";
import { Group, Badge } from "@mantine/core";
import React from "react";
import { deleteAccomodation } from "@/server/actions/accomodation";
import { TableLoader } from "@/components/loader/table-loader";
import { useGetAccomodations } from "@/app/(dashboard)/accomodations/_data";
import { useSearchParams } from "next/navigation";
import { tableColumnProps } from "@/constants";
import { ViewActionIcon } from "@/components/view-action-icon";
import { MantineTable } from "@/components/mantine-table";
import { DeleteActionIcon } from "@/components/delete-action-icon";
import { UpdateActionIcon } from "@/components/edit-action-icon";
import { UpdateAccomodationForm } from "@accomodations/_components/update-accomodation-form";

export const AccomodationsTable = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data: accomodations, isPending } = useGetAccomodations(
    search as string
  );

  if (isPending || !accomodations) return <TableLoader />;
  return (
    <>
      <MantineTable
        records={accomodations || []}
        columns={[
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
            accessor: "",
            title: "Anschrift",
            render: ({ street, zipCode, location }) => (
              <>
                {street} {zipCode} {location}
              </>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "reservable",
            title: "Reservierbar",
            render: ({ reservable }) => (
              <Badge color={reservable ? "green" : "red"}>
                {reservable ? "Reservierbar" : "Nicht reservierbar"}
              </Badge>
            ),
            ...tableColumnProps,
          },
          {
            accessor: "actions",
            title: "Aktionen",
            width: "0%",
            render: (accomodation) => (
              <Group gap={0} justify="flex-end">
                <ViewActionIcon href={`/accomodations/${accomodation.id}`} />
                <UpdateActionIcon
                  model="Unterkunft"
                  modalContent={
                    <UpdateAccomodationForm accomodation={accomodation} />
                  }
                />
                <DeleteActionIcon
                  id={accomodation.id}
                  model="Unterkunft"
                  action={deleteAccomodation}
                />
              </Group>
            ),
            ...tableColumnProps,
          },
        ]}
        storeKey="accomodations-table"
      />
    </>
  );
};
