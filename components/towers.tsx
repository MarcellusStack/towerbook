"use client";

import { capitalizeFirstLetter } from "@utils/index";
import {
  Box,
  Card,
  Group,
  Stack,
  Title,
  Text,
  Badge,
  SimpleGrid,
  Button,
  ActionIcon,
  rem,
} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

export type TowerProps = {
  id: string;
  type: "tower" | "quad";
  status: "operation" | "inactive" | "active";
  number: number;
  location: string;
};

export const Towers = ({ towers }: { towers: TowerProps[] }) => {
  const statusColors = {
    operation: "blue",
    inactive: "red",
    active: "green",
  };

  const typeDescription = {
    tower: "Turm",
    quad: "Quad",
  };
  return (
    <SimpleGrid cols={4} spacing="sm" verticalSpacing="sm">
      {towers.map((tower) => (
        <Card
          key={tower.id}
          component={Link}
          href={`/towers/${tower.id}`}
          /* sx={(theme) => ({
            "&:hover": {
              outlineWidth: 1,
              outlineColor: theme.colors.blue[6],
              outlineStyle: "solid",
              backgroundColor: theme.colors.blue[0],
            },
            "&:active": {
              transform: "translateY(0.0625rem)",
            },
          })} */
          className="w-full"
          withBorder
          padding="sm"
          radius="sm"
        >
          <Group justify="space-between">
            <Stack gap="xs">
              <Box>
                <Title order={3} fw={700} size="h3">
                  {capitalizeFirstLetter(typeDescription[tower.type])}{" "}
                  {tower.number}
                </Title>
                <Text fw={400} size="md" c="dimmed">
                  {tower.location}
                </Text>
              </Box>
              <Badge color={statusColors[tower.status]}>
                {capitalizeFirstLetter(tower.status)}
              </Badge>
            </Stack>
            {tower.type === "tower" && (
              <Image
                src="/tower.png"
                width={64}
                height={64}
                style={{ alignSelf: "flex-end", opacity: 0.25 }}
                alt="type icon"
              />
            )}
            {tower.type === "quad" && (
              <Image
                src="/quad.png"
                width={64}
                height={64}
                style={{ alignSelf: "flex-end", opacity: 0.25 }}
                alt="type icon"
              />
            )}
          </Group>
          <Group mt="xs" gap={0} justify="flex-end">
            <ActionIcon
              component={Link}
              href={`/towers/${tower.id}`}
              variant="subtle"
            >
              <IconPencil
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
            <ActionIcon
              /*  onClick={() => {
                modals.open({
                  title: "Turm löschen",

                  children: (
                    <>
                      {<DeleteUserAction userId={user.userId} />}
                    </>
                  ),
                });
              }} */
              variant="subtle"
              color="red"
            >
              <IconTrash
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
              />
            </ActionIcon>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
};
