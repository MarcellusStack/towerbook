"use client";
import React from "react";
import { Badge, Group } from "@mantine/core";
import { roles } from "@/constants/roles";
import type { User } from "@prisma/client";

const RoleBadge = ({ user }: { user: User }) => {
  return (
    <Group>
      {user.role.map((role) => (
        <Badge color={roles.filter((r) => r.value === role)[0].color}>
          {roles.filter((r) => r.value === role)[0].label}
        </Badge>
      ))}
    </Group>
  );
};

export default RoleBadge;
