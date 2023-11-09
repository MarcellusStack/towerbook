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
import { getUserAction } from "@/server/actions/get-user-action";

export const UserComboboxButton = ({
  formActionId,
  label,
}: {
  formActionId: string;
  label: string;
}) => {
  const formAction = createFormActions(formActionId);
  const [firstOpen, setFirstOpen] = useState(false);
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
        width={250}
        position="bottom-start"
        withArrow
        withinPortal={false}
        onOptionSubmit={(val) => {
          const filteredUser =
            result.data && result.data.users.filter((user) => user.id === val);

          formAction.insertListItem("watchman", {
            id: filteredUser[0].id,
            firstName: filteredUser[0].firstName,
            lastName: filteredUser[0].lastName,
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
            placeholder="Benutzer suchen"
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
