import { useDisclosure } from "@mantine/hooks";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  Title,
  Text,
  Button,
  AppShell,
  Burger,
  Group,
  Skeleton,
  Anchor,
} from "@mantine/core";
import { prisma } from "@/server/db";
import SignUpForm from "@/components/forms/sign-up-form";
import { redirect } from "next/navigation";
import { getUser } from "@server/lib/utils/get-user";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <>
      <Title order={1} size="h2">
        Herzlich Willkommen
      </Title>
      <Text c="dimmed" size="sm">
        Bitte geben sie Ihre Daten ein
      </Text>
      <SignUpForm />
    </>
  );
}
