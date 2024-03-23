import { DatePickerInput } from "@mantine/dates";
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

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (date) {
      newSearchParams.set("createdAt", date.toString());
    } else {
      newSearchParams.delete("createdAt");
    }
    router.push(`${pathName}?${newSearchParams.toString()}`);
  }, [date]);

  return (
    <DatePickerInput
      clearable
      locale="de"
      value={date}
      onChange={(newDate) => setDate(newDate)}
      valueFormat="DD.MM.YYYY"
      placeholder="Datum auswählen"
      popoverProps={{ withinPortal: false }}
    />
  );
};
