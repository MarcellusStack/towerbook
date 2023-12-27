"use client";

import React from "react";
import { Button } from "@mantine/core";
import { useParams } from "next/navigation";

import { createRevision } from "@server/actions/create-revision";
import { useActionNotification } from "@/hooks/use-action-notification";
import { completeRevision } from "@/server/actions/complete-revision";

export const RevisionAction = ({
  modelType,
  type,
}: {
  modelType: string;
  type: "request" | "complete";
}) => {
  const create = useActionNotification({
    action: createRevision,
    executeNotification: `Revision wird erstellt`,
    hideModals: true,
  });

  const complete = useActionNotification({
    action: completeRevision,
    executeNotification: `Revision wird abgeschlossen`,
    hideModals: true,
  });

  const { id } = useParams();
  return (
    <>
      {type === "request" ? (
        <Button
          variant="filled"
          loading={create.status === "executing"}
          onClick={() => {
            create.execute({ id: id, modelType: modelType });
          }}
        >
          Revision anfragen
        </Button>
      ) : (
        <Button
          variant="filled"
          loading={complete.status === "executing"}
          onClick={() => {
            complete.execute({ id: id, modelType: modelType });
          }}
        >
          Revision abschließen
        </Button>
      )}
    </>
  );
};
