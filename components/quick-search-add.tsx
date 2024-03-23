"use client";

import { useDebouncedValue } from "@mantine/hooks";
import { Button, TextInput, Text, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { modals } from "@mantine/modals";
import { usePathname } from "next/navigation";

export type QuickSearchAddProps = {
  modalTitle: string;
  modalDescription: string;
  modalContent: ReactNode;
};

export const QuickSearchAdd = ({
  modalTitle,
  modalDescription,
  modalContent,
}: QuickSearchAddProps) => {
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
      <Group gap="sm" wrap="nowrap">
        <TextInput
          value={text}
          onChange={(event) => setText(event.currentTarget.value)}
          placeholder="Suche"
          className="w-full"
        />
        <Button
          className="shrink-0"
          leftSection={<IconPlus size={14} />}
          onClick={() => {
            modals.open({
              title: modalTitle,
              children: (
                <>
                  <Text c="dimmed" size="sm" mb="sm">
                    {modalDescription}
                  </Text>
                  {modalContent}
                </>
              ),
            });
          }}
        >
          Hinzufügen
        </Button>
      </Group>
    </>
  );
};
