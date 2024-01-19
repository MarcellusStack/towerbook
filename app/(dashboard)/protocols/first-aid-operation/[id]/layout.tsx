import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import {
  Alert,
  Grid,
  GridCol,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCheck,
  IconUserExclamation,
} from "@tabler/icons-react";
import { convertDate } from "@/utils";
import { CompleteAction } from "@components/complete-action";
import { FirstAidOperationOverview } from "@components/first-aid-operation-overview";
import { getFirstAidOperation } from "@server/queries/get-first-aid-operation";
import { completeFirstAidOperation } from "@server/actions/complete-first-aid-operation";
import { ModalAction } from "@/components/modal-action";
import { RevisionAction } from "@/components/revision-action";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  const operation = await getFirstAidOperation(id, ["admin"]);

  if (!operation) {
    notFound();
  }

  return (
    <>
      <SecondaryAppHeading
        title={operation.type === "big" ? "Großeinsatz" : "Einsatz"}
        extraInfo={
          <Group>
            <Text size="lg" c="dimmed">
              Turm {operation.tower.number}{" "}
            </Text>
            <Text size="lg" c="dimmed">
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
}
