"use client";
import React, { useEffect } from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  Button,
  Stack,
  Fieldset,
  SimpleGrid,
  Text,
  Group,
  Card,
  ActionIcon,
} from "@mantine/core";
import { towerDayDutyPlanSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { IconTrash, IconCalendarEvent } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { TowerDayFormAction } from "@/components/tower-day-form-action";
import { DeleteModalAction } from "@components/delete-modal-action";
import { createDutyPlan } from "@/server/actions/create-duty-plan";
import { deleteDutyPlan } from "@/server/actions/delete-duty-plan";
import { CreateShiftForm } from "@components/forms/create-shift-form";
import { updateTowerDayDutyPlan } from "@/server/actions/update-tower-day-duty-plan";
import { TowerDayDutyPlan } from "@components/tower-day-duty-plan";
import { type TowerdayDutyPlanProps } from "@/server/queries/get-tower-day-duty-plan";

export const TowerdayDutyPlanForm = ({
  towerday,
}: {
  towerday: TowerdayDutyPlanProps;
}) => {
  const form = useForm({
    name: "tower-day-duty-plan-form",
    validate: zodResolver(towerDayDutyPlanSchema),

    initialValues: {
      towerDayId: towerday.id,
      towerId: towerday.towerId,
      dutyPlanId: towerday.dutyplan === null ? "" : towerday.dutyplan.id,
      shifts:
        towerday.dutyplan === null ? new Array() : towerday.dutyplan.shifts,
    },
  });

  const update = useActionNotification({
    action: updateTowerDayDutyPlan,
    executeNotification: `Turm Tag wird aktualisiert`,
  });

  const create = useActionNotification({
    action: createDutyPlan,
    executeNotification: `Dienstplan wird erstellt`,
  });

  useEffect(() => {
    if (!create.result.data) return;
    form.setFieldValue("dutyPlanId", create.result.data.dutyPlanId);
  }, [create.result.data]);
  return (
    <>
      {!towerday.dutyplan && (
        <Card withBorder>
          <Stack>
            <Text>Es wurde noch kein Dienstplan erstellt.</Text>
            <Group>
              <Button
                loading={create.status === "executing"}
                onClick={() => {
                  create.execute({
                    towerId: towerday.towerId,
                    towerDayId: towerday.id,
                    date: new Date(towerday.createdAt),
                  });
                }}
              >
                Erstellen
              </Button>
              <Button>Dienstplan hinzufügen</Button>
            </Group>
          </Stack>
        </Card>
      )}
      {towerday.dutyplan && (
        <form
          onSubmit={form.onSubmit((values) => {
            update.execute(values);
          })}
        >
          <Stack gap="md">
            <Fieldset
              legend={
                <Text fw={700} size="xl">
                  Wachplan
                </Text>
              }
            >
              <Group justify="space-between" mb="xs">
                <Button
                  variant="subtle"
                  leftSection={<IconCalendarEvent />}
                  onClick={() => {
                    modals.open({
                      title: "Schicht hinzufügen",
                      children: (
                        <>
                          <CreateShiftForm />
                        </>
                      ),
                    });
                  }}
                >
                  Hinzufügen
                </Button>
                <Button onClick={() => console.log(towerday)}>
                  Reset to initial values
                </Button>
                <ActionIcon
                  onClick={() => {
                    modals.open({
                      title: "Dienstplan löschen",
                      children: (
                        <>
                          <DeleteModalAction
                            id={towerday.dutyplan.id}
                            action={deleteDutyPlan}
                            model="Dienstplan"
                          />
                        </>
                      ),
                    });
                  }}
                  variant="subtle"
                  size="lg"
                  color="red"
                >
                  <IconTrash
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                </ActionIcon>
              </Group>
              <SimpleGrid cols={2} spacing="md">
                <TowerDayDutyPlan
                  shifts={form.values.shifts}
                  shiftType="duty"
                />
                <TowerDayDutyPlan
                  shifts={form.values.shifts}
                  shiftType="prepared"
                />
              </SimpleGrid>
            </Fieldset>
            <Card withBorder mt="xs" p="sm" pos="sticky" bottom={0}>
              <TowerDayFormAction
                updateStatus={update.status === "executing"}
                form="dutyplanStatus"
              />
            </Card>
          </Stack>
        </form>
      )}
    </>
  );
};
