"use client";
import React, { useState } from "react";
import { useForm, zodResolver } from "@mantine/form";
import {
  PasswordInput,
  TextInput,
  Button,
  Stack,
  Anchor,
  Fieldset,
  SimpleGrid,
  FileInput,
  Select,
  Text,
  NumberInput,
  Checkbox,
  MultiSelect,
  Input,
} from "@mantine/core";
import { authSchema, userPermissionsSchema } from "@/schemas";
import { useAction } from "next-safe-action/hook";
import Link from "next/link";
import { signUp } from "@server/actions/sign-up";
import { useActionNotification } from "@/hooks/use-action-notification";
import { useRouter } from "next/navigation";
import { DatePickerInput } from "@mantine/dates";
import { updateUserProfile } from "@server/actions/update-user-profile";

import { type Profile } from "@prisma/client";
import { roles } from "@/constants/roles";
import { updateUserPermissions } from "@/server/actions/update-user-permissions";
import { uploadFile } from "@/server/actions/upload-file";
import { convertBase64 } from "@/utils";

export const UserCertificateForm = ({ user }: { user: Profile }) => {
  /* const form = useForm({
    /* validate: zodResolver(userPermissionsSchema), 
    initialValues: {
      file: "",
    },
  }); */

  const { execute, result, status } = useActionNotification({
    action: uploadFile,
    executeNotification: `Datei wird hochgeladen`,
  });
  return (
    <form
    /* onSubmit={form.onSubmit((values) =>
        execute({ ...values, userId: user.userId })
      )} */
    >
      <Stack gap="md">
        <Fieldset
          legend={
            <Text fw={700} size="xl">
              Schwimmen
            </Text>
          }
        >
          <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
            <Input.Wrapper label="Rettungsschwimmerschein">
              <Input
                type="file"
                accept="application/pdf"
                /* {...form.getInputProps("test")} */
                onChange={async (event) => {
                  const file = event.target.files[0];
                  const base64 = await convertBase64(file);

                  execute({
                    file: base64,
                    fileName: `${user.userId}_rettungsschwimmerschein`,
                    userId: user.userId,
                  });
                }}
              />
            </Input.Wrapper>
          </SimpleGrid>
        </Fieldset>
        <Button
          loading={status === "executing"}
          type="submit"
          className="self-start"
        >
          Speichern
        </Button>
      </Stack>
    </form>
  );
};
