"use client";

import { useDebouncedValue } from "@mantine/hooks";
import { TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export const QuickSearch = () => {
  const router = useRouter();
  const pathName = usePathname();

  const [text, setText] = useState("");
  const [query] = useDebouncedValue(text, 750);

  useEffect(() => {
    if (!query) {
      router.push(`${pathName}`);
    } else {
      router.push(`${pathName}?search=${query}`);
    }
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
