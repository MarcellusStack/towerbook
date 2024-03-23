"use client";

import {
  CheckIcon,
  Combobox,
  Group,
  Pill,
  PillsInput,
  Stack,
  rem,
  Text,
  useCombobox,
  Loader,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useActionNotification } from "@/hooks/use-action-notification";
import { createFormActions } from "@mantine/form";
import { getPermissionAction } from "@/server/actions/permission";

export const PermissionMultiSelect = ({
  formActionId,
  formField,
  label,
  initialValue,
}: {
  formActionId: string;
  formField: string;
  label: string;
  initialValue?: { id: string; name: string }[] | null;
}) => {
  const formAction = createFormActions(formActionId);
  const [firstOpen, setFirstOpen] = useState(false);
  const [value, setValue] = useState<{ id: string; name: string }[] | null>(
    initialValue || []
  );
  const [search, setSearch] = useState("");

  const [debounced] = useDebouncedValue(search, 300);
  const { execute, result, status } = useActionNotification({
    action: getPermissionAction,
    executeNotification: `Berechtigungen werden geladen`,
  });
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
    },
    onDropdownOpen: () => {
      combobox.focusSearchInput();
      if (!firstOpen) {
        execute({});
        setFirstOpen(true);
      }
    },
  });

  useEffect(() => {
    if (!firstOpen) {
      return;
    }
    execute({ search: debounced });
  }, [debounced]);

  return (
    <Stack gap={rem(4)}>
      <Text component="label" size="sm" fw={500}>
        {label}
      </Text>
      <Combobox
        store={combobox}
        onOptionSubmit={(val) => {
          const isItemSelected = value.some((v) => v.id === val);

          if (isItemSelected) {
            setValue(value.filter((v) => v.id !== val));
            formAction.removeListItem(
              formField,
              value.findIndex((v) => v.id === val)
            );
          } else {
            const filteredPermission =
              result.data &&
              result.data.permissions.filter(
                (permission) => permission.id === val
              );
            setValue([
              ...value,
              {
                name: filteredPermission[0].name,
                id: filteredPermission[0].id,
              },
            ]);
            formAction.insertListItem(formField, {
              name: filteredPermission[0].name,
              id: filteredPermission[0].id,
            });
          }
        }}
        withinPortal={true}
      >
        <Combobox.Target>
          <PillsInput onClick={() => combobox.openDropdown()}>
            <Pill.Group>
              {value.map((item, index) => (
                <Pill
                  key={item.id}
                  withRemoveButton
                  onRemove={() => {
                    setValue((current) => current.filter((v) => v !== item));
                    formAction.removeListItem(formField, index);
                  }}
                >
                  {item.name}
                </Pill>
              ))}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  value={search}
                  placeholder="Berechtigung suchen"
                  onChange={(event) => {
                    combobox.updateSelectedOptionIndex();
                    setSearch(event.currentTarget.value);
                  }}
                />
              </Combobox.EventsTarget>
            </Pill.Group>
          </PillsInput>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            {result.data && result.data.permissions.length > 0 ? (
              result.data.permissions.map((item) => (
                <Combobox.Option
                  value={item.id}
                  key={item.id}
                  active={value.includes(item.id)}
                >
                  <Group gap="sm">
                    {value.includes(item.id) ? <CheckIcon size={12} /> : null}
                    {item.name}
                  </Group>
                </Combobox.Option>
              ))
            ) : (
              <Combobox.Empty>
                {result.data &&
                  result.data.permissions.length === 0 &&
                  "Keine Berechtigungen gefunden"}
                {status === "executing" && <Loader />}
              </Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Stack>
  );
};
