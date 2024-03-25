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
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { getLifeguardAction } from "@/server/actions/get-lifeguard-action";

export const LifeguardSelect = ({
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

  const [debounced] = useDebouncedValue(search, 300);
  const { execute, result, status } = useActionNotification({
    action: getLifeguardAction,
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
        withinPortal={true}
        onOptionSubmit={(val) => {
          const filteredUser =
            result.data && result.data.users.filter((user) => user.id === val);
          setValue(`${filteredUser[0].firstName} ${filteredUser[0].lastName}`);
          formAction.setFieldValue(formField, filteredUser[0]);
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
            placeholder="Benutzer suchen"
          />
          <Combobox.Options>
            {result.data && result.data.users.length > 0 ? (
              result.data.users.map((item) => (
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
