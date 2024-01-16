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
import { Suspense } from "react";
import { unstable_noStore } from "next/cache";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { Accomodations } from "@services/accomodation/components/accomodations";
import { getAccomodations } from "@/services/accomodation/queries";
import { CreateAccomodationForm } from "@/services/accomodation/components/create-accomodation-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const accomodations = await getAccomodations("", ["admin"]);

  return (
    <>
      <PrimaryAppHeading title="Unterkünfte" />
      <QuickSearchAdd
        modalTitle="Unterkunft anlegen"
        modalDescription="Erstellen Sie hier eine Unterkunft. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateAccomodationForm />}
      />
      <Accomodations accomodations={accomodations || []} />
    </>
  );
}
