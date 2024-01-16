"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@mantine/core";
import { useActionNotification } from "@/hooks/use-action-notification";
import { verifyEmail } from "@/server/actions/user";

export const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const { execute, result, status } = useActionNotification({
    action: verifyEmail,
    executeNotification: "E-Mail wird bestätigt",
    redirectUrl: "/sign-in",
  });
  return (
    <>
      <Button
        loading={status === "executing"}
        onClick={() => {
          execute({ userId: userId, token: token });
        }}
      >
        E-Mail bestätigen
      </Button>
    </>
  );
};
