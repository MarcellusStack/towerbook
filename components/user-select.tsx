"use client";

import { useActionNotification } from "@/hooks/use-action-notification";
import { getUserAction } from "@/server/actions/get-user-action";
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

export const UserSelect = ({
  formActionId,
  formField,
  label,
  initialValue,
}: {
  formActionId: string;
  formField: string;
  label: string;
  initialValue: string | null;
}) => {
  const formAction = createFormActions(formActionId);
  const [firstOpen, setFirstOpen] = useState(false);
  const [value, setValue] = useState<string | null>(initialValue || null);
  const [search, setSearch] = useState("");
  const { execute, result, status } = useActionNotification({
    action: getUserAction,
    executeNotification: `Benutzer werden geladen`,
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
          const filteredUser =
            result.data && result.data.users.filter((user) => user.id === val);
          setValue(`${filteredUser[0].firstName} ${filteredUser[0].lastName}`);
          formAction.setFieldValue(formField, val);
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
            {value || <Input.Placeholder>Benutzer auswählen</Input.Placeholder>}
          </InputBase>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Search
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
            placeholder="Search groceries"
          />
          <Combobox.Options>
            {result.data && result.data.users.length > 0 ? (
              result.data.users
                .filter(
                  (item) =>
                    item.firstName
                      .toLowerCase()
                      .includes(search.toLowerCase().trim()) ||
                    item.lastName
                      .toLowerCase()
                      .includes(search.toLowerCase().trim())
                )
                .map((item) => (
                  <Combobox.Option value={item.id} key={item.id}>
                    {item.firstName} {item.lastName}
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
