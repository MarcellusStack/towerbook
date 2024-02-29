import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Checkbox,
  Group,
  Menu,
  SimpleGrid,
  Stack,
  Table,
  TextInput,
  ThemeIcon,
  rem,
  Text,
  Textarea,
} from "@mantine/core";
import { createFormActions, useForm, zodResolver } from "@mantine/form";
import {
  IconBan,
  IconCheck,
  IconChecklist,
  IconEye,
  IconFileX,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";
import { PermissionProps, updatePermission } from "@permissions/[id]/_actions";
import { updatePermissionSchema } from "@/schemas";
import { permissions } from "@/constants";
import { useActionNotification } from "@/hooks/use-action-notification";
import { EditLink } from "@/components/view-action-icon";

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

export const PermissionForm = ({
  permission,
}: {
  permission: PermissionProps;
}) => {
  const form = useForm({
    validate: zodResolver(updatePermissionSchema),
    name: "permission-form",
    initialValues: {
      id: permission.id,
      name: permission.name,
      description: permission.description,
      isAdmin: permission.isAdmin,
      createOrganization: permission.createOrganization,
      readOrganization: permission.readOrganization,
      updateOrganization: permission.updateOrganization,
      deleteOrganization: permission.deleteOrganization,
      createInvitation: permission.createInvitation,
      readInvitation: permission.readInvitation,
      updateInvitation: permission.updateInvitation,
      deleteInvitation: permission.deleteInvitation,
      createTower: permission.createTower,
      readTower: permission.readTower,
      updateTower: permission.updateTower,
      deleteTower: permission.deleteTower,
      createTowerday: permission.createTowerday,
      readTowerday: permission.readTowerday,
      updateTowerday: permission.updateTowerday,
      deleteTowerday: permission.deleteTowerday,
      completeTowerdaySection: permission.completeTowerdaySection,
      completeTowerday: permission.completeTowerday,
      createDutyplan: permission.createDutyplan,
      readDutyplan: permission.readDutyplan,
      updateDutyplan: permission.updateDutyplan,
      deleteDutyplan: permission.deleteDutyplan,
      createUser: permission.createUser,
      readUser: permission.readUser,
      updateUser: permission.updateUser,
      deleteUser: permission.deleteUser,
      createProtocol: permission.createProtocol,
      readProtocol: permission.readProtocol,
      updateProtocol: permission.updateProtocol,
      deleteProtocol: permission.deleteProtocol,
      completeProtocol: permission.completeProtocol,
      createRevision: permission.createRevision,
      readRevision: permission.readRevision,
      updateRevision: permission.updateRevision,
      deleteRevision: permission.deleteRevision,
      createAccomodation: permission.createAccomodation,
      readAccomodation: permission.readAccomodation,
      updateAccomodation: permission.updateAccomodation,
      deleteAccomodation: permission.deleteAccomodation,
      createBooking: permission.createBooking,
      readBooking: permission.readBooking,
      updateBooking: permission.updateBooking,
      deleteBooking: permission.deleteBooking,
      createPermission: permission.createPermission,
      readPermission: permission.readPermission,
      updatePermission: permission.updatePermission,
      deletePermission: permission.deletePermission,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updatePermission,
    executeNotification: "Berechtigung wird aktualisiert",
  });

  return (
    <>
      <form onSubmit={form.onSubmit((values) => execute(values))}>
        <Stack gap="sm">
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
                    <IconEye
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
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
                <Table.Th className="w-0">
                  <ThemeIcon variant="white" color="black" size="lg">
                    <IconChecklist
                      style={{ width: "70%", height: "70%" }}
                      stroke={1.5}
                    />
                  </ThemeIcon>
                </Table.Th>
                <Table.Th className="w-0">
                  <ThemeIcon variant="white" color="black" size="lg">
                    <IconFileX
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
          <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
            <TextInput label="Name" {...form.getInputProps("name")} />
            <Textarea
              label="Beschreibung"
              {...form.getInputProps("description")}
            />
            <Checkbox
              label="Admin(Kompletter Zugriff)"
              {...form.getInputProps("isAdmin", {
                type: "checkbox",
              })}
            />
          </SimpleGrid>
        </Stack>
        <Card withBorder mt="sm" p="sm" pos="sticky" bottom={rem(12)}>
          <Button
            variant="filled"
            type="submit"
            loading={status === "executing"}
            className="self-end"
          >
            Speichern
          </Button>
        </Card>
      </form>
    </>
  );
};
