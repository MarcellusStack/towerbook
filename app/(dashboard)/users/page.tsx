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
import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";

export const dynamic = "force-dynamic";

/* export const getProfiles = async () => {
  "use server";

  const profiles = await prisma.organization.findMany({});
  console.log(profiles);
  return profiles;
}; */

export default async function Page() {
  return (
    <>
      <PrimaryAppHeading title="Benutzer" />
      <QuickSearchAdd
        modalTitle="Benutzer anlegen"
        modalDescription="Erstellen Sie hier Benutzer für Ihre Organisation. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
      />
    </>
  );
}
