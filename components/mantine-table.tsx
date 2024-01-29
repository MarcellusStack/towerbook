import { Button, Group, Stack } from "@mantine/core";
import {
  DataTable,
  DataTableColumn,
  useDataTableColumns,
} from "mantine-datatable";
import React from "react";

type MantineTableProps<T> = {
  columns: DataTableColumn<T>[];
  records: T[];
  key: string;
  loading: boolean;
};

export const MantineTable = <T,>({
  columns,
  records,
  key,
  loading,
}: MantineTableProps<T>) => {
  const {
    effectiveColumns,
    resetColumnsWidth,
    resetColumnsOrder,
    resetColumnsToggle,
  } = useDataTableColumns({
    key,
    columns: columns,
  });
  return (
    <Stack>
      <DataTable
        withTableBorder
        borderRadius="sm"
        striped
        minHeight={records.length === 0 ? 150 : 0}
        noRecordsText="Keine Einträge vorhanden"
        storeColumnsKey={key}
        columns={effectiveColumns}
        fetching={loading}
        records={records}
      />
      <Group justify="right">
        <Button size="compact-xs" onClick={resetColumnsWidth}>
          Spaltenbreite zurücksetzen
        </Button>
        <Button size="compact-xs" onClick={resetColumnsOrder}>
          Spaltenanordnung zurücksetzen
        </Button>
        <Button size="compact-xs" onClick={resetColumnsToggle}>
          Spalten zurücksetzen
        </Button>
      </Group>
    </Stack>
  );
};
