"use client";

import { useDisclosure, useDebouncedValue } from "@mantine/hooks";
import { Modal, Button, TextInput, Text, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  const [opened, { open, close }] = useDisclosure(false);

  const router = useRouter();
  /* const initialRender = useRef(true); */

  const [text, setText] = useState("");
  const [query] = useDebouncedValue(text, 750);

  useEffect(() => {
    /* if (initialRender.current) {
      initialRender.current = false;
      return;
    } */

    if (!query) {
      router.push(`/users`);
    } else {
      router.push(`/users?search=${query}`);
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
        <Button leftSection={<IconPlus size={14} />} onClick={open}>
          Hinzufügen
        </Button>
      </Group>
      <Modal opened={opened} onClose={close} size="md" title={modalTitle}>
        <Text c="dimmed" size="sm">
          {modalDescription}
        </Text>
        {modalContent}
      </Modal>
    </>
  );
};
