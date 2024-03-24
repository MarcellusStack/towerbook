"use client";

import { useDebouncedValue } from "@mantine/hooks";
import { TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

export const QuickSearch = () => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("search");

  const [text, setText] = useState(search ? search : "");
  const [query] = useDebouncedValue(text, 750);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (!query) {
      newSearchParams.delete("search");
    } else {
      newSearchParams.set("search", query);
    }
    router.push(`${pathName}?${newSearchParams.toString()}`);
  }, [query]);
  return (
    <>
      <TextInput
        value={text}
        onChange={(event) => setText(event.currentTarget.value)}
        placeholder="Suche"
        className="w-full"
      />
    </>
  );
};
