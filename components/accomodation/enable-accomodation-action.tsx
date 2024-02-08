"use client";
import { useActionNotification } from "@hooks/use-action-notification";
import { Button } from "@mantine/core";
import React from "react";
import { enableAccomodation } from "@/server/actions/accomodation";
import { useParams } from "next/navigation";

export const EnableAccomodationAction = () => {
  const { id } = useParams();
  const { execute, result, status } = useActionNotification({
    action: enableAccomodation,
    executeNotification: "Unterkunft wird freigegeben",
    hideModals: true,
  });
  return (
    <Button
      fullWidth
      color="green"
      loading={status === "executing"}
      onClick={() => {
        execute({ id: id });
      }}
    >
      Unterkunft freigeben
    </Button>
  );
};
