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
} from "@tabler/icons-react";
import { navLinks } from "@constants/nav-links";
import Link from "next/link";
import { signOut } from "next-auth/react";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();

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
                  leftSection={
                    <IconSettings style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Einstellungen
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
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
      <AppShell.Aside p="sm">Aside</AppShell.Aside>
    </AppShell>
  );
};
