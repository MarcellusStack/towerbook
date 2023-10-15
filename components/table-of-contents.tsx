"use client";
import cx from "clsx";
import { Box, Text, Group, rem } from "@mantine/core";
import { IconListSearch } from "@tabler/icons-react";
import classes from "../styles/TableOfContents.module.css";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const links = [
  { label: "Stammdaten", link: "#usage", order: 1 },
  { label: "Notfallkontakte", link: "#position", order: 1 },
  { label: "Bankverbindung", link: "#overlays", order: 1 },
];

export function TableOfContents() {
  const searchParams = useSearchParams();
  console.log(searchParams.toString());
  const active = "s";
  const items = links.map((item) => (
    <Box
      component={Link}
      href={item.link}
      key={item.label}
      className={cx(classes.link, {
        [classes.linkActive]: active === item.link,
      })}
      style={{ paddingLeft: `calc(${item.order} * var(--mantine-spacing-md))` }}
    >
      {item.label}
    </Box>
  ));

  return (
    <div>
      <Group mb="md">
        <IconListSearch
          style={{ width: rem(18), height: rem(18) }}
          stroke={1.5}
        />
        <Text fw={700} size="xl">
          Inhalte
        </Text>
      </Group>
      {items}
    </div>
  );
}
