"use client";
import { DatePickerInput } from "@mantine/dates";
import { useDebouncedValue } from "@mantine/hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export const DateInputFilter = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const searchParamsDate = searchParams.get("createdAt");

  const [date, setDate] = useState<Date | null>(
    searchParamsDate ? new Date(searchParamsDate) : null
  );
  const [query] = useDebouncedValue(date, 750);

  useEffect(() => {
    if (!query) {
      router.push(`${pathName}`);
    } else {
      router.push(`${pathName}?createdAt=${query}`);
    }
  }, [query]);

  return (
    <DatePickerInput
      locale="de"
      value={date}
      onChange={setDate}
      valueFormat="DD.MM.YYYY"
      placeholder="Datum auswählen"
      popoverProps={{ withinPortal: false }}
    />
  );
};
