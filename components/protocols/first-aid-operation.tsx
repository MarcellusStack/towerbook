import React, { use } from "react";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import { Alert, Grid, GridCol, Group, Stack, Text } from "@mantine/core";
import { IconCheck, IconUserExclamation } from "@tabler/icons-react";
import { convertDate } from "@/utils";
import { CompleteAction } from "@components/complete-action";
import { FirstAidOperationOverview } from "@components/first-aid-operation-overview";
import { completeFirstAidOperation } from "@server/actions/complete-first-aid-operation";
import { ModalAction } from "@/components/modal-action";
import { RevisionAction } from "@/components/revision-action";
import { useParams } from "next/navigation";
import { useGetFirstAidOperation } from "@/data/protocols";
import { LayoutLoader } from "@components/loader/layout-loader";

export const FirstAidOperation = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { id } = useParams();
  const { data: operation, isPending } = useGetFirstAidOperation(id as string);

  if (isPending || !operation) return <LayoutLoader />;

  return (
    <>
      <SecondaryAppHeading
        title={operation.type === "big" ? "Großeinsatz" : "Einsatz"}
        extraInfo={
          <Group>
            <Text size="lg" c="dimmed">
              Turm {operation.tower.number}
              {convertDate(new Date(operation.date))}
            </Text>
          </Group>
        }
      />
      <Grid style={{ position: "relative", overflow: "visible" }}>
        <GridCol span={8}>
          {operation.status === "completed" ? (
            <Alert
              variant="light"
              color="green"
              title="Einsatz abgeschlossen"
              icon={<IconCheck />}
            >
              Der Einsatz wurde beendet. Gut gemacht!
            </Alert>
          ) : (
            children
          )}
        </GridCol>
        <GridCol span={4}>
          <Stack pt="sm" style={{ position: "sticky", top: 0 }}>
            <FirstAidOperationOverview operation={operation} />
            <Group>
              {operation.status === "revision" ? (
                <ModalAction
                  color="orange"
                  icon={<IconUserExclamation />}
                  label="Revision aufheben"
                  content={
                    <RevisionAction
                      modelType="firstaidoperation"
                      type="complete"
                    />
                  }
                />
              ) : (
                <ModalAction
                  color="orange"
                  icon={<IconUserExclamation />}
                  label="Revision anfragen"
                  content={
                    <RevisionAction
                      modelType="firstaidoperation"
                      type="request"
                    />
                  }
                />
              )}
              <CompleteAction
                label="Einsatz"
                action={completeFirstAidOperation}
              />
            </Group>
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
};
