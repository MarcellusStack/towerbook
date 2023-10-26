"use client";
import {
  rem,
  Burger,
  Transition,
  Button,
  Affix,
  Menu,
  ActionIcon,
} from "@mantine/core";
import { IconArrowUp, IconListSearch } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";
import { useState } from "react";

export type TableOfContentsProps = { label: string; link: string };

export function TableOfContents({ links }: { links: TableOfContentsProps[] }) {
  const [scroll, scrollTo] = useWindowScroll();
  const [active, setActive] = useState("");

  return (
    <Affix position={{ bottom: 10, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Menu style={transitionStyles} shadow="md" width={200}>
            <Menu.Target>
              <ActionIcon variant="light" size="lg" aria-label="Informationen">
                <IconListSearch
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Inhaltsverzeichnis</Menu.Label>
              {links.map((item) => (
                <Menu.Item
                  component="a"
                  color={item.link === active ? "blue" : "gray"}
                  onClick={() => {
                    setActive(item.link);
                  }}
                  href={item.link}
                  key={item.label}
                >
                  {item.label}
                </Menu.Item>
              ))}
              <Menu.Divider />
              <Menu.Item
                leftSection={
                  <IconArrowUp style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => {
                  scrollTo({ y: 0 });
                }}
              >
                Nach oben Scrollen
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Transition>
    </Affix>
  );
}
