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
  storeKey: string;
  height?: number;
  minHeightRecords?: number;
  hideColumnsToggle?: boolean;
  classes?: {
    root?: string;
    table?: string;
    header?: string;
    footer?: string;
    pagination?: string;
  };
};

export const MantineTable = <T,>({
  columns,
  records,
  storeKey,
  height,
  minHeightRecords,
  hideColumnsToggle = false,
}: MantineTableProps<T>) => {
  const {
    effectiveColumns,
    resetColumnsWidth,
    resetColumnsOrder,
    resetColumnsToggle,
  } = useDataTableColumns({
    key: storeKey,
    columns: columns as DataTableColumn<unknown>[],
  });
  return (
    <Stack>
      <DataTable
        {...(height && minHeightRecords && records.length > minHeightRecords
          ? { height }
          : {})}
        withTableBorder
        borderRadius="sm"
        striped
        minHeight={records.length === 0 ? 150 : 0}
        noRecordsText="Keine Einträge vorhanden"
        storeColumnsKey={storeKey}
        columns={effectiveColumns}
        records={records}
      />
      {hideColumnsToggle ? null : (
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
      )}
    </Stack>
  );
};
