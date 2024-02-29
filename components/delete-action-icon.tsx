import { ActionIcon } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import React from "react";
import { DeleteModalAction } from "@/components/delete-modal-action";

export type DeleteActionProps = {
  id: string;
  model: string;
  action: unknown;
};

export const DeleteActionIcon = ({ id, model, action }: DeleteActionProps) => {
  return (
    <ActionIcon
      onClick={() => {
        modals.open({
          title: `${model} löschen`,
          children: (
            <>
              <DeleteModalAction id={id} action={action} model="Unterkunft" />
            </>
          ),
        });
      }}
      variant="subtle"
      color="red"
    >
      <IconTrash style={{ width: "70%", height: "70%" }} stroke={1.5} />
    </ActionIcon>
  );
};
