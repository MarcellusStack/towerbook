import { ActionIcon } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

export const EditLink = ({ href }: { href: string }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <ActionIcon
      loading={isPending}
      component={Link}
      href={href}
      variant="subtle"
      onClick={() => startTransition(() => router.push(href))}
    >
      <IconPencil style={{ width: "70%", height: "70%" }} stroke={1.5} />
    </ActionIcon>
  );
};
