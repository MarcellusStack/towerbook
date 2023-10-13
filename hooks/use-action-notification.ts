"use client";
import { useAction } from "next-safe-action/hook";

import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { modals } from "@mantine/modals";

export type ActionNotificationProps = {
  action: any;
  redirectUrl?: string;
  executeNotification?: string;
  hideModals?: boolean;
};

export const useActionNotification = ({
  action,
  redirectUrl,
  executeNotification,
  hideModals,
}: ActionNotificationProps) => {
  const router = useRouter();
  const { execute, result, status } = useAction(action, {
    onExecute() {
      if (executeNotification) {
        notifications.show({
          id: executeNotification,
          withBorder: true,
          autoClose: false,
          title: "Bitte warten, die Aktion wird ausgeführt",
          message: executeNotification,
          color: "yellow",
        });
      }
    },
    onSuccess(data, input, reset) {
      if (!data) {
        return;
      }
      if (executeNotification) {
        notifications.hide(executeNotification);
      }
      notifications.show({
        id: "success-action-notification",
        withBorder: true,
        autoClose: 5000,
        title: "Erfolgreich",
        message: data as string,
        color: "green",
      });

      if (hideModals) {
        modals.closeAll();
      }

      if (redirectUrl) {
        router.push(redirectUrl);
      }
    },
    onError(error, input, reset) {
      if (!error) {
        return;
      }

      if (executeNotification) {
        notifications.hide(executeNotification);
      }
      notifications.show({
        id: "success-action-notification",
        withBorder: true,
        autoClose: 5000,
        title: "Fehler",
        message: "Aktion fehlgeschlagen, versuchen sie es später erneut",
        color: "red",
      });
    },
  });
  return { execute, result, status };
};
