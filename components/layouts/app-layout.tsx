"use client";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import {
  ActionIcon,
  AppShell,
  Burger,
  Group,
  rem,
  List,
  Divider,
  Stack,
  Box,
} from "@mantine/core";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import { Branding } from "@/components/branding";
import {
  IconSearch,
  IconBell,
  IconSettings,
  IconRefresh,
  IconFileInfo,
  IconFileExport,
  IconLayoutDashboard,
  IconBuildingBroadcastTower,
  IconBroadcast,
  IconClipboard,
  IconUsers,
  IconCalendarPin,
  IconFirstAidKit,
  IconWriting,
  IconUserSearch,
  IconBed,
  IconUserShield,
} from "@tabler/icons-react";
import { navLinks } from "@constants/nav-links";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { refreshSession } from "@server/actions/refresh-session";
import { useAction } from "next-safe-action/hook";
import { Breadcrumb } from "@components/breadcrumb";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const actions: SpotlightActionData[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      onClick: () => router.push("/dashboard"),
      leftSection: <IconLayoutDashboard stroke={1.5} />,
    },
    {
      id: "towers",
      label: "Türme",
      onClick: () => router.push("/towers"),
      leftSection: <IconBuildingBroadcastTower stroke={1.5} />,
    },
    {
      id: "tower-days",
      label: "Turm Tage",
      onClick: () => router.push("/tower-days"),
      leftSection: <IconBroadcast stroke={1.5} />,
    },
    {
      id: "protocols",
      label: "Protokolle",
      onClick: () => router.push("/protocols"),
      leftSection: <IconClipboard stroke={1.5} />,
    },
    {
      id: "first-aid-operation",
      label: "Erste-Hilfe-Einsätze",
      onClick: () => router.push("/protocols/first-aid-operation"),
      leftSection: <IconFirstAidKit stroke={1.5} />,
    },
    {
      id: "group-registration",
      label: "Dokumentation Kinder Gruppen",
      onClick: () => router.push("/protocols/group-registration"),
      leftSection: <IconWriting stroke={1.5} />,
    },
    {
      id: "search-list",
      label: "Personen Suchliste",
      onClick: () => router.push("/protocols/search-list"),
      leftSection: <IconUserSearch stroke={1.5} />,
    },
    {
      id: "users",
      label: "Benutzer",
      onClick: () => router.push("/users"),
      leftSection: <IconUsers stroke={1.5} />,
    },
    {
      id: "permissions",
      label: "Berechtigungen",
      onClick: () => router.push("/permissions"),
      leftSection: <IconUserShield stroke={1.5} />,
    },
    {
      id: "duty-plans",
      label: "Dienstpläne",
      onClick: () => router.push("/duty-plans"),
      leftSection: <IconCalendarPin stroke={1.5} />,
    },
    {
      id: "accomodations",
      label: "Unterkünfte",
      onClick: () => router.push("/accomodations"),
      leftSection: <IconBed stroke={1.5} />,
    },
    {
      id: "settings",
      label: "Einstellungen",
      onClick: () => router.push("/settings"),
      leftSection: <IconSettings stroke={1.5} />,
    },
  ];
  const [opened, { toggle }] = useDisclosure();
  const refresh = useAction(refreshSession, {
    onExecute() {
      notifications.show({
        id: "Sitzung wird aktualisiert",
        withCloseButton: false,
        loading: true,
        withBorder: true,
        autoClose: false,
        title: "Bitte warten, die Aktion wird ausgeführt",
        message: "Sitzung wird aktualisiert",
        color: "yellow",
      });
    },
    onSuccess(data, input, reset) {
      if (!data) {
        return;
      }

      notifications.hide("Sitzung wird aktualisiert");

      notifications.show({
        id: "success-action-notification",
        withBorder: true,
        autoClose: 5000,
        title: "Erfolgreich",
        message: data.message as string,
        color: "green",
      });

      router.refresh();
    },
    onError(error, input, reset) {
      if (!error) {
        return;
      }

      notifications.hide("Sitzung wird aktualisiert");

      notifications.show({
        id: "error-action-notification",
        withBorder: true,
        autoClose: 5000,
        title: "Fehler",
        message: "Aktion fehlgeschlagen, versuchen sie es später erneut",
        color: "red",
      });
    },
  });

  const [scroll] = useWindowScroll();

  return (
    <AppShell
      header={{ height: 73 }}
      navbar={{
        width: 80,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      aside={{
        width: 80,
        breakpoint: "md",
        collapsed: { desktop: false, mobile: true },
      }}
      padding="sm"
    >
      <AppShell.Header>
        <Group h="100%" px="sm" justify="space-between">
          {scroll.y <= 100 && <Branding />}
          {scroll.y > 100 && (
            <Box className="flex flex-row items-center gap-3">
              <Box className="p-3 rounded-sm bg-gray-100 grid place-items-center">
                <Image
                  src="/branding.png"
                  width={32}
                  height={32}
                  alt="branding"
                />
              </Box>
              <Breadcrumb />
            </Box>
          )}
          <Group gap="sm">
            <ActionIcon
              onClick={spotlight.open}
              variant="light"
              size="lg"
              aria-label="Search"
              radius="xl"
            >
              <IconSearch
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon>
            <Spotlight
              actions={actions}
              nothingFound="Nothing found..."
              highlightQuery
              searchProps={{
                leftSection: (
                  <IconSearch
                    style={{ width: rem(20), height: rem(20) }}
                    stroke={1.5}
                  />
                ),
                placeholder: "Suche...",
              }}
            />
            <ActionIcon
              variant="light"
              size="lg"
              aria-label="Search"
              radius="xl"
            >
              <IconBell style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
            {/* <ActionIcon
              loading={refresh.status === "executing"}
              onClick={() => refresh.execute({})}
              variant="light"
              size="lg"
              aria-label="Reload page"
              radius="xl"
            >
              <IconRefresh
                style={{ width: "70%", height: "70%" }}
                stroke={1.5}
              />
            </ActionIcon> */}
            <UserButton afterSignOutUrl="/" />
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="sm">
        <Stack justify="space-between" className="h-full">
          <List spacing="sm" size="sm" center>
            {navLinks.map((link) => (
              <List.Item key={link.id} className="grid place-items-center">
                <ActionIcon
                  component={Link}
                  href={link.href}
                  variant="subtle"
                  size="lg"
                  aria-label={link.name}
                >
                  {link.icon}
                </ActionIcon>
                <Divider mt="sm" />
              </List.Item>
            ))}
          </List>
          <List spacing="sm" size="sm" center>
            <List.Item className="grid place-items-center">
              <ActionIcon
                component={Link}
                href="/settings"
                variant="subtle"
                size="lg"
                aria-label="Settings"
              >
                <IconSettings
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
              <Divider mt="sm" />
            </List.Item>
          </List>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Stack gap="sm">
          <Breadcrumb />
          {children}
        </Stack>
      </AppShell.Main>
      <AppShell.Aside p="sm">
        <Stack justify="space-between" className="h-full">
          <List spacing="sm" size="sm" center>
            <List.Item className="grid place-items-center">
              <ActionIcon variant="subtle" size="lg" aria-label="Informationen">
                <IconFileInfo
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
              <Divider mt="sm" />
            </List.Item>
            <List.Item className="grid place-items-center">
              <ActionIcon variant="subtle" size="lg" aria-label="Export">
                <IconFileExport
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
              <Divider mt="sm" />
            </List.Item>
          </List>
        </Stack>
      </AppShell.Aside>
    </AppShell>
  );
};
