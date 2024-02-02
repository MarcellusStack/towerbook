import { ActionIcon, Button, Menu, Table, ThemeIcon, rem } from "@mantine/core";
import { createFormActions, useForm } from "@mantine/form";
import {
  IconBan,
  IconCheck,
  IconEye,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";
import { PermissionProps } from "@permissions/[id]/_actions";

export const PermissionSelect = ({
  formValue,
  formField,
}: {
  formValue: boolean;
  formField: string;
}) => {
  const formAction = createFormActions("permission-form");
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon
          size="lg"
          color={formValue ? "green" : "red"}
          variant="subtle"
        >
          {formValue ? (
            <IconCheck style={{ width: "70%", height: "70%" }} />
          ) : (
            <IconBan style={{ width: "70%", height: "70%" }} />
          )}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          disabled={formValue}
          onClick={() => formAction.setFieldValue(formField, true)}
          leftSection={
            <IconCheck style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Zugriff
        </Menu.Item>
        <Menu.Item
          disabled={!formValue}
          onClick={() => formAction.setFieldValue(formField, false)}
          leftSection={<IconBan style={{ width: rem(14), height: rem(14) }} />}
        >
          kein Zugriff
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export const PermissionTable = ({
  permission,
}: {
  permission: PermissionProps;
}) => {
  const form = useForm({
    /* validate: zodResolver(authSchema), */
    name: "permission-form",
    initialValues: {
      createTower: permission.createTower,
      readTower: permission.readTower,
      updateTower: permission.updateTower,
      deleteTower: permission.deleteTower,
    },
  });

  const permissions = [
    {
      name: "Turm",
      permissions: ["createTower", "readTower", "updateTower", "deleteTower"],
    },
    {
      name: "Berechtigung",
      permissions: [
        "createPermission",
        "readPermission",
        "updatePermission",
        "deletePermission",
      ],
    },
  ];
  return (
    <>
      <Table verticalSpacing="xs" withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Kollektion</Table.Th>
            <Table.Th className="w-0">
              <ThemeIcon variant="white" color="black" size="lg">
                <IconPlus
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ThemeIcon>
            </Table.Th>
            <Table.Th className="w-0">
              <ThemeIcon variant="white" color="black" size="lg">
                <IconEye style={{ width: "70%", height: "70%" }} stroke={1.5} />
              </ThemeIcon>
            </Table.Th>
            <Table.Th className="w-0">
              <ThemeIcon variant="white" color="black" size="lg">
                <IconPencil
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ThemeIcon>
            </Table.Th>
            <Table.Th className="w-0">
              <ThemeIcon variant="white" color="black" size="lg">
                <IconTrash
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ThemeIcon>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {permissions.map((permission) => (
            <Table.Tr key={permission.name}>
              <Table.Td>{permission.name}</Table.Td>
              {permission.permissions.map((perm) => (
                <Table.Td key={perm}>
                  <PermissionSelect
                    formValue={form.values[perm]}
                    formField={perm}
                  />
                </Table.Td>
              ))}
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};
