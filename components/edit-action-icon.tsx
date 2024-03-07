import { ActionIcon } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconPencil } from "@tabler/icons-react";
import React from "react";

export type UpdateActionProps = {
  model: string;
  modalContent: unknown;
};

export const UpdateActionIcon = ({
  model,
  modalContent,
}: UpdateActionProps) => {
  return (
    <ActionIcon
      onClick={() => {
        modals.open({
          title: `${model} aktualisieren`,
          children: <>{modalContent}</>,
        });
      }}
      variant="subtle"
      color="blue"
    >
      <IconPencil style={{ width: "70%", height: "70%" }} stroke={1.5} />
    </ActionIcon>
  );
};
