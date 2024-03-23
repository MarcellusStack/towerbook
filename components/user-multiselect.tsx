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
  Button,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { useActionNotification } from "@/hooks/use-action-notification";
import { getUserAction } from "@/server/actions/get-user-action";
import { createFormActions } from "@mantine/form";

export const UserMultiSelect = ({
  formActionId,
  formField,
  label,
  initialValue,
}: {
  formActionId: string;
  formField: string;
  label: string;
  initialValue?: { id: string; firstName: string; lastName: string }[] | [];
}) => {
  const formAction = createFormActions(formActionId);
  const [firstOpen, setFirstOpen] = useState(false);
  const [value, setValue] = useState<
    { id: string; firstName: string; lastName: string }[] | []
  >(initialValue || []);
  const [search, setSearch] = useState("");

  const [debounced] = useDebouncedValue(search, 300);
  const { execute, result, status } = useActionNotification({
    action: getUserAction,
    executeNotification: `Benutzer werden geladen`,
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
            const filteredUser =
              result.data &&
              result.data.users.filter((user) => user.id === val);

            setValue([
              ...value,
              {
                firstName: filteredUser[0].firstName,
                lastName: filteredUser[0].lastName,
                id: filteredUser[0].id,
              },
            ]);
            formAction.insertListItem(formField, val);
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
                  {item.firstName} {item.lastName}
                </Pill>
              ))}

              <Combobox.EventsTarget>
                <PillsInput.Field
                  onFocus={() => combobox.openDropdown()}
                  onBlur={() => combobox.closeDropdown()}
                  value={search}
                  placeholder="Benutzer suchen"
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
            {result.data && result.data.users.length > 0 ? (
              result.data.users.map((item) => (
                <Combobox.Option
                  value={item.id}
                  key={item.id}
                  active={value.includes(item.id)}
                >
                  <Group gap="sm">
                    {value.includes(item.id) ? <CheckIcon size={12} /> : null}
                    {item.firstName} {item.lastName}
                  </Group>
                </Combobox.Option>
              ))
            ) : (
              <Combobox.Empty>
                {result.data &&
                  result.data.users.length === 0 &&
                  "Keine Benutzer gefunden"}
                {status === "executing" && <Loader />}
              </Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Stack>
  );
};
