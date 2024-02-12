"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs, Anchor, ActionIcon, rem } from "@mantine/core";
import { capitalizeFirstLetter, translate } from "@/utils/index";
import {
  IconChevronRight,
  IconHome,
  IconLayoutDashboard,
} from "@tabler/icons-react";

export const Breadcrumb = () => {
  const pathname = usePathname();

  const slug = pathname.split("/").slice(1);

  if (!slug) return null;

  return (
    <Breadcrumbs separator={<IconChevronRight size={16} />}>
      <Link href="/dashboard" passHref>
        <Anchor component="span" fw={500}>
          <ActionIcon color="gray">
            <IconLayoutDashboard
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Anchor>
      </Link>
      {slug.map((item, index) => (
        <Link
          className="no-underline"
          passHref
          key={index}
          href={
            index === 0 ? `/${item}` : `/${slug.slice(0, index + 1).join("/")}`
          }
        >
          <Anchor
            className="no-underline"
            component="span"
            c={index === slug.length - 1 ? "blue" : "gray"}
            fw={500}
          >
            {capitalizeFirstLetter(translate(item))}
          </Anchor>
        </Link>
      ))}
    </Breadcrumbs>
  );
};
