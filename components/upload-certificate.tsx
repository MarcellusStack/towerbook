"use client";

import { useActionNotification } from "@hooks/use-action-notification";
import { uploadFile } from "@server/actions/upload-file";
import { convertBase64 } from "@/utils";
import { ActionIcon, FileInput, Popover } from "@mantine/core";
import {
  IconCalendarCheck,
  IconCalendarPlus,
  IconCalendarX,
  IconDownload,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { downloadFile } from "@/server/actions/download-file";
import { notifications } from "@mantine/notifications";
import { useAction } from "next-safe-action/hook";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { uploadPrivateFile } from "@/server/actions/upload-private-file";

export const UploadCertificate = ({
  label,
  inputProp,
  inputExpirationProp,
  form,
  userId,
}: {
  label: string;
  inputProp: string;
  inputExpirationProp: string;
  form: any;
  userId: string;
}) => {
  const upload = useActionNotification({
    action: uploadPrivateFile,
    executeNotification: `Datei wird hochgeladen`,
  });

  const [opened, handlers] = useDisclosure(false);

  //Used the useActionNotification template and removed some of the stuff that isnt needed because for now this is a one time thing to do another action
  //In the future we will prob need to make onsuccess, onerror, onexecute, etc. props for the hook and make it more dynamic
  const download = useAction(downloadFile, {
    onExecute() {
      notifications.show({
        id: "Datei wird heruntergeladen",
        withCloseButton: false,
        loading: true,
        withBorder: true,
        autoClose: false,
        title: "Bitte warten, die Aktion wird ausgeführt",
        message: "Datei wird heruntergeladen",
        color: "yellow",
      });
    },
    onSuccess(data, input, reset) {
      if (!data) {
        return;
      }

      notifications.hide("Datei wird heruntergeladen");

      notifications.show({
        id: "success-action-notification",
        withBorder: true,
        autoClose: 5000,
        title: "Erfolgreich",
        message: data as string,
        color: "green",
      });

      window.open(data);
    },
    onError(error, input, reset) {
      if (!error) {
        return;
      }

      notifications.hide("Datei wird heruntergeladen");

      notifications.show({
        id: "error-action-notification",
        withBorder: true,
        autoClose: 5000,
        title: "Fehler",
        message: "Aktion fehlgeschlagen, versuchen sie es später erneut",
        color: "red",
      });
    },
  });

  const currentDate = new Date();

  return (
    <FileInput
      label={label}
      placeholder={form.getInputProps(inputProp).value ?? "Datei hochladen"}
      disabled={upload.status === "executing"}
      description={
        <>
          <ActionIcon
            mr="4"
            loading={
              upload.status === "executing" || download.status === "executing"
            }
            disabled={form.getInputProps(inputProp).value === null}
            variant="subtle"
            aria-label="Download"
            onClick={() => {
              download.execute({
                fileName: form.values[inputProp],
                field: inputProp,
              });
            }}
          >
            <IconDownload
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>

          <Popover
            width={200}
            position="bottom"
            withArrow
            shadow="md"
            opened={opened}
          >
            <Popover.Target>
              <ActionIcon
                variant="subtle"
                aria-label="change certificate valid date"
                onClick={handlers.toggle}
                color={
                  !form.getInputProps(inputExpirationProp).value
                    ? "blue"
                    : new Date(
                        form.getInputProps(inputExpirationProp).value
                      ).setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)
                    ? "red"
                    : "green"
                }
              >
                {!form.getInputProps(inputExpirationProp).value ? (
                  <IconCalendarPlus
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                ) : new Date(
                    form.getInputProps(inputExpirationProp).value
                  ).setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0) ? (
                  <IconCalendarX
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                ) : (
                  <IconCalendarCheck
                    style={{ width: "70%", height: "70%" }}
                    stroke={1.5}
                  />
                )}
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <DateInput
                popoverProps={{ withinPortal: false }}
                locale="de"
                label="Gültigkeitsdatum"
                valueFormat="DD.MM.YYYY"
                value={
                  form.getInputProps(inputExpirationProp).value
                    ? new Date(form.getInputProps(inputExpirationProp).value)
                    : new Date()
                }
                onChange={(value) => {
                  handlers.toggle();
                  form.setFieldValue(inputExpirationProp, value);
                }}
              />
            </Popover.Dropdown>
          </Popover>
        </>
      }
      accept="application/pdf,image/*"
      onChange={async (event) => {
        if (!event) return;

        const base64 = await convertBase64(event);

        const fileType = event.type.split("/")[0];

        form.setFieldValue(inputProp, `${userId}_${inputProp}.${fileType}`);

        upload.execute({
          file: base64,
          fileName: `${userId}_${inputProp}`,
        });
      }}
    />
  );
};
