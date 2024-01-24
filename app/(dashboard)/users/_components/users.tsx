"use client";
import { FormLoader } from "@/components/loader/form-loader";
import { UserInvitationsTable } from "@/components/tables/user-invitation-table";
import { UsersTable } from "@/components/tables/user-table";
import { Divider, Title } from "@mantine/core";
import React from "react";
import { useGetInvitations, useGetUsers } from "@users/data";
import { useSearchParams } from "next/navigation";

export const Users = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data: users, isPending: isPendingUsers } = useGetUsers(
    search as string
  );
  const { data: invitations, isPending: isPendingInvitations } =
    useGetInvitations();

  if (isPendingUsers || isPendingInvitations || !users || !invitations)
    return <FormLoader />;

  return (
    <>
      <UsersTable users={users} />
      <Title order={2} size="h2" fw={700}>
        Einladungen
      </Title>
      <Divider />
      <UserInvitationsTable invitations={invitations} />
    </>
  );
};
