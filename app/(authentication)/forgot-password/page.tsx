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

export const dynamic = "force-dynamic";

/* export const getProfiles = async () => {
  "use server";

  const profiles = await prisma.organization.findMany({});
  console.log(profiles);
  return profiles;
}; */

export default async function Page() {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }
  return (
    <>
      <Title order={1} size="h2">
        Passwort vergessen
      </Title>
      <Text c="dimmed" size="sm">
        Wenn sie Ihr Passwort vergessen haben, melden sie sich bei Ihrem
        Turmbuch Administrator.
      </Text>
      <Button component={Link} href="/sign-in">
        Zur Anmeldung
      </Button>
    </>
  );
}
