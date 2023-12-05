"use client";

import React from "react";
import { Button, Group } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconChecklist,
  IconUserExclamation,
} from "@tabler/icons-react";
import { UpdateModalAction } from "@/components/update-modal-action";

export const CompleteAction = ({
  label,
  action,
}: {
  label: string;
  action: any;
}) => {
  return (
    <Group>
      <Button disabled color="red" leftSection={<IconUserExclamation />}>
        Revision anfragen
      </Button>
      <Button
        color="green"
        leftSection={<IconChecklist />}
        onClick={() => {
          modals.open({
            title: `${label} aktualisieren`,
            children: (
              <>
                <UpdateModalAction action={action} model={label} />
              </>
            ),
          });
        }}
      >
        {label} abschließen
      </Button>
    </Group>
  );
};
