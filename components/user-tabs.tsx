"use client";

import { Divider, Tabs } from "@mantine/core";
import React from "react";
import type { Profile } from "@prisma/client";
import { UserAccountForm } from "@components/forms/user-account-form";
import { UserPermissionsForm } from "@components/forms/user-permissions-form";
import { UserCertificateForm } from "@components/forms/user-certificate-form";

const UserTabs = ({ user }: { user: Profile }) => {
  return (
    <Tabs variant="pills" defaultValue="account">
      <Tabs.List className="  ">
        <Tabs.Tab value="account">Stammdaten</Tabs.Tab>
        <Tabs.Tab value="certificates">Zertifikate</Tabs.Tab>
        <Tabs.Tab value="permissions">Berechtigungen</Tabs.Tab>
        <Tabs.Tab value="duty-plan">Dienstplan</Tabs.Tab>
      </Tabs.List>
      <Divider my="sm" />
      <Tabs.Panel value="account">
        <UserAccountForm user={user} />
      </Tabs.Panel>
      <Tabs.Panel value="certificates">
        <UserCertificateForm user={user} />
      </Tabs.Panel>
      <Tabs.Panel value="permissions">
        <UserPermissionsForm user={user} />
      </Tabs.Panel>
      <Tabs.Panel value="duty-plan">Settings tab content</Tabs.Panel>
    </Tabs>
  );
};

export default UserTabs;
