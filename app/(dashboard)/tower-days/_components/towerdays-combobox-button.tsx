"use client";
import {
  useCombobox,
  Combobox,
  Button,
  Loader,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { useState } from "react";
import { createFormActions } from "@mantine/form";
import { useActionNotification } from "@/hooks/use-action-notification";
import { getTowersAction } from "@towerdays/_actions";

export const TowerComboboxButton = ({
  formActionId,
  formField,
  label,
}: {
  formActionId: string;
  formField: string;
  label: string;
}) => {
  const formAction = createFormActions(formActionId);
  const [firstOpen, setFirstOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { execute, result, status } = useActionNotification({
    action: getTowersAction,
    executeNotification: `Türme werden geladen`,
  });
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch("");
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput();
      if (!firstOpen) {
        execute({});
        setFirstOpen(true);
      }
    },
  });

  return (
    <Stack gap={rem(4)}>
      <Text component="label" size="sm" fw={500}>
        {label}
      </Text>
      <Combobox
        store={combobox}
        width={250}
        position="bottom-start"
        withArrow
        withinPortal={false}
        onOptionSubmit={(val) => {
          const filteredTower =
            result.data &&
            result.data.towers.filter((tower) => tower.id === val);

          formAction.insertListItem(formField, {
            tower: {
              id: filteredTower[0].id,
              name: filteredTower[0].name,
              number: filteredTower[0].number,
            },
            towerLeader: {
              id: "",
              firstName: "",
              lastName: "",
            },
          });
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target withAriaAttributes={false}>
          <Button
            variant="outline"
            onClick={() => {
              combobox.toggleDropdown();
            }}
          >
            Hinzufügen
          </Button>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Türme suchen"
          />
          <Combobox.Options>
            {result.data && result.data.towers.length > 0 ? (
              result.data.towers
                .filter(
                  (item) =>
                    item.name
                      .toString()
                      .toLowerCase()
                      .includes(search.toLowerCase().trim()) ||
                    item.number
                      .toString()
                      .toLowerCase()
                      .includes(search.toLowerCase().trim())
                )
                .map((item) => (
                  <Combobox.Option value={item.id} key={item.id}>
                    {item.name} {item.number}
                  </Combobox.Option>
                ))
            ) : (
              <Combobox.Empty>
                {result.data &&
                  result.data.towers.length === 0 &&
                  "Keine Türme gefunden"}
                {status === "executing" && <Loader />}
              </Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Stack>
  );
};
