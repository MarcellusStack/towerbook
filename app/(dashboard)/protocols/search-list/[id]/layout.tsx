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
import { getSearchList } from "@server/queries/get-search-list";
import { SearchListOverview } from "@/components/search-list-overview";
import { CompleteAction } from "@components/complete-action";
import { completeSearchList } from "@server/actions/complete-search-list";
import { RevisionAction } from "@/components/revision-action";
import { ModalAction } from "@/components/modal-action";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  const searchlist = await getSearchList(id, ["admin"]);

  if (!searchlist) {
    notFound();
  }

  return (
    <>
      <SecondaryAppHeading
        title="Personen Suchliste"
        extraInfo={
          <Text size="lg" c="dimmed">
            {searchlist.firstName} {searchlist.lastName}{" "}
            {convertDate(new Date(searchlist.date))}
          </Text>
        }
      />
      <Grid style={{ position: "relative", overflow: "visible" }}>
        <GridCol span={8}>
          {searchlist.status === "completed" ? (
            <Alert
              variant="light"
              color="green"
              title="Suche abgeschlossen"
              icon={<IconCheck />}
            >
              Die Suche wurde übergeben. Gut gemacht!
            </Alert>
          ) : (
            children
          )}
        </GridCol>
        <GridCol span={4}>
          <Stack pt="sm" style={{ position: "sticky", top: 0 }}>
            <SearchListOverview searchlist={searchlist} />
            <Group>
              {searchlist.status === "revision" ? (
                <ModalAction
                  color="orange"
                  icon={<IconUserExclamation />}
                  label="Revision aufheben"
                  content={
                    <RevisionAction modelType="searchlist" type="complete" />
                  }
                />
              ) : (
                <ModalAction
                  color="orange"
                  icon={<IconUserExclamation />}
                  label="Revision anfragen"
                  content={
                    <RevisionAction modelType="searchlist" type="request" />
                  }
                />
              )}

              <CompleteAction label="Sucheintrag" action={completeSearchList} />
            </Group>
          </Stack>
        </GridCol>
      </Grid>
    </>
  );
}
