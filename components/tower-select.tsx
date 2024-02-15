"use client";

import { useActionNotification } from "@/hooks/use-action-notification";
import { getTowerAction } from "@server/actions/get-tower-action";
import {
  Combobox,
  InputBase,
  Input,
  Loader,
  useCombobox,
  Stack,
  Text,
  rem,
} from "@mantine/core";
import { createFormActions } from "@mantine/form";
import { useState } from "react";

export const TowerSelect = ({
  formActionId,
  formField,
  label,
  initialValue,
}: {
  formActionId: string;
  formField: string;
  label: string;
  initialValue?: string | null;
}) => {
  const formAction = createFormActions(formActionId);
  const [firstOpen, setFirstOpen] = useState(false);
  const [value, setValue] = useState<string | null>(initialValue || null);
  const [search, setSearch] = useState("");
  const { execute, result, status } = useActionNotification({
    action: getTowerAction,
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
        withinPortal={false}
        onOptionSubmit={(val) => {
          const filteredTower =
            result.data &&
            result.data.towers.filter((tower) => tower.id === val);
          setValue(
            `${filteredTower[0].name} ${filteredTower[0].number} - ${filteredTower[0].location}`
          );
          formAction.setFieldValue(formField, filteredTower[0].id);
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            component="button"
            type="button"
            pointer
            rightSection={<Combobox.Chevron />}
            onClick={() => combobox.toggleDropdown()}
            rightSectionPointerEvents="none"
          >
            {value || <Input.Placeholder>Turm auswählen</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Turm suchen"
          />
          <Combobox.Options>
            {result.data && result.data.towers.length > 0 ? (
              result.data.towers
                .filter(
                  (item) =>
                    item.number
                      .toLowerCase()
                      .includes(search.toLowerCase().trim()) ||
                    item.name
                      .toLowerCase()
                      .includes(search.toLowerCase().trim())
                )
                .map((item) => (
                  <Combobox.Option value={item.id} key={item.id}>
                    {item.name} {item.number} - {item.location}
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
