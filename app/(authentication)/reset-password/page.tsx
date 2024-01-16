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
import SignInForm from "@/components/forms/sign-in-form";
import { redirect } from "next/navigation";
import { getUser } from "@server/lib/utils/get-user";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }
  return (
    <>
      <Title order={1} size="h2">
        Passwort zurücksetzen
      </Title>
      <Text c="dimmed" size="sm">
        Geben Sie ein Neues Passwort ein
      </Text>
      <ResetPasswordForm />
    </>
  );
}
