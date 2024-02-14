"use client";

import { useActionNotification } from "@hooks/use-action-notification";
import { uploadFile } from "@server/actions/upload-file";
import { convertBase64 } from "@/utils";
import { ActionIcon, FileInput } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import React from "react";
import { downloadFile } from "@/server/actions/download-file";
import { notifications } from "@mantine/notifications";
import { useAction } from "next-safe-action/hook";
import { createFormActions } from "@mantine/form";

export const UploadInput = ({
  label,
  placeholder,
  formActionId,
  inputProp,
  inputValue,
  userId,
}: {
  label: string;
  placeholder: string;
  formActionId: string;
  inputProp: string;
  inputValue: string;
  userId: string;
}) => {
  const upload = useActionNotification({
    action: uploadFile,
    executeNotification: `Datei wird hochgeladen`,
  });

  const formAction = createFormActions(formActionId);

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

  return (
    <FileInput
      label={label}
      placeholder={placeholder}
      disabled={upload.status === "executing"}
      description={
        <ActionIcon
          loading={
            upload.status === "executing" || download.status === "executing"
          }
          disabled={inputValue === null}
          variant="subtle"
          aria-label="Download"
          onClick={() => {
            download.execute({
              fileName: inputValue,
            });
          }}
        >
          <IconDownload style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
      }
      accept="application/pdf"
      onChange={async (event) => {
        if (!event) return;

        const base64 = await convertBase64(event);

        formAction.setFieldValue(inputProp, `${userId}_${event.name}`);

        upload.execute({
          file: base64,
          fileName: `${userId}_${event.name}`,
          userId: userId,
        });
      }}
    />
  );
};
