"use client";
import { useActionNotification } from "@hooks/use-action-notification";
import { Button } from "@mantine/core";
import React from "react";
import { disableAccomodation } from "@/server/actions/accomodation";
import { useParams } from "next/navigation";

export const DisableAccomodationAction = () => {
  const { id } = useParams();
  const { execute, result, status } = useActionNotification({
    action: disableAccomodation,
    executeNotification: "Unterkunft wird gesperrt",
    hideModals: true,
  });
  return (
    <Button
      fullWidth
      color="red"
      loading={status === "executing"}
      onClick={() => {
        execute({ id: id });
      }}
    >
      Unterkunft sperren
    </Button>
  );
};
