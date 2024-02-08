"use client";

import { completeTowerDay } from "@/server/actions/complete-tower-day";
import { Button, Group } from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconChecklist,
  IconLayoutDashboard,
  IconUserExclamation,
} from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { UpdateModalAction } from "@/components/update-modal-action";

const TowerDayAction = () => {
  const { id } = useParams();
  return (
    <Group>
      <Button
        leftSection={<IconLayoutDashboard />}
        component={Link}
        href={`/tower-days/${id}/`}
        variant="outline"
      >
        Übersicht
      </Button>
      <Button disabled color="red" leftSection={<IconUserExclamation />}>
        Revision anfragen
      </Button>
      <Button
        color="green"
        leftSection={<IconChecklist />}
        onClick={() => {
          modals.open({
            title: "Turm Tag aktualisieren",
            children: (
              <>
                <UpdateModalAction action={completeTowerDay} model="Turm Tag" />
              </>
            ),
          });
        }}
      >
        Turmtag abschließen
      </Button>
    </Group>
  );
};

export default TowerDayAction;
