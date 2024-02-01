import {
  IconLayoutDashboard,
  IconTopologyStar3,
  IconUser,
  IconUserShield,
} from "@tabler/icons-react";
import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { PageTabs } from "@components/page-tabs";

export const links = [
  {
    value: "/",
    icon: <IconLayoutDashboard size={16} stroke={1.5} />,
    label: "Übersicht",
  },
  {
    value: "account",
    icon: <IconUser size={16} stroke={1.5} />,
    label: "Account",
  },
  {
    value: "organization",
    icon: <IconTopologyStar3 size={16} stroke={1.5} />,
    label: "Organisation",
  },
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PrimaryAppHeading title="Einstellungen" />
      <PageTabs page="settings" links={links} />
      {children}
    </>
  );
}
