"use client";

import { useDisclosure, useDebouncedValue } from "@mantine/hooks";
import { Modal, Button, TextInput, Text, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
