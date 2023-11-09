"use client";
import { useDisclosure } from "@mantine/hooks";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Group,
  Skeleton,
  Popover,
  Menu,
  rem,
  List,
  Divider,
  Stack,
} from "@mantine/core";
import { Branding } from "@/components/branding";
import {
  IconSearch,
  IconBell,
  IconSettings,
  IconLogout,
  IconRefresh,
  IconFileInfo,
  IconFileExport,
} from "@tabler/icons-react";
import { navLinks } from "@constants/nav-links";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";
import { refreshSession } from "@server/actions/refresh-session";
import { useAction } from "next-safe-action/hook";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
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
          <Branding />
          <Group gap="sm">
            <ActionIcon
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
            <ActionIcon
              variant="light"
              size="lg"
              aria-label="Search"
              radius="xl"
            >
              <IconBell style={{ width: "70%", height: "70%" }} stroke={1.5} />
            </ActionIcon>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <ActionIcon
                  variant="light"
                  size="lg"
                  aria-label="Search"
                  radius="xl"
                >
                  <Avatar color="blue" radius="xl">
                    MP
                  </Avatar>
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => refresh.execute({})}
                  leftSection={
                    <IconRefresh style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Sitzung Aktualisieren
                </Menu.Item>
                <Menu.Item
                  leftSection={
                    <IconSettings style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Einstellungen
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  onClick={() => {
                    signOut();
                  }}
                  leftSection={
                    <IconLogout style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Abmelden
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>

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
            <List.Item className="grid place-items-center">
              <ActionIcon
                onClick={() => {
                  signOut();
                }}
                variant="subtle"
                size="lg"
                aria-label="Sign Out"
              >
                <IconLogout
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </List.Item>
          </List>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        <Stack gap="sm">{children}</Stack>
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
