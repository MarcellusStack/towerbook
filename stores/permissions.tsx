"use client";
import React from "react";
import { Permission } from "@prisma/client";

export const PermissionsContext = React.createContext<Permission[] | null>(
  null
);

export type UsePermissionsProps = {
  permissionName?: string;
};

export const usePermissions = (
  permissionName?: string
): { permissions: Permission[] | null; hasAccess: boolean } => {
  const permissions = React.useContext(PermissionsContext);
  const hasAccess = permissions?.some(
    (permission) => permission.isAdmin || permission[permissionName]
  );

  return { permissions, hasAccess };
};

export type PermissionsProviderProps = {
  children: React.ReactNode;
  permissions: Permission[] | null;
};

export const PermissionsProvider = ({
  children,
  permissions,
}: PermissionsProviderProps) => {
  return (
    <PermissionsContext.Provider value={permissions}>
      {children}
    </PermissionsContext.Provider>
  );
};
