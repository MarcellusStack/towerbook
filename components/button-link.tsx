"use client";
import { Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

export const ButtonLink = ({
  title,
  href,
}: {
  title: string;
  href: string;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      loading={isPending}
      onClick={() => startTransition(() => router.push(href))}
    >
      {title}
    </Button>
  );
};
