"use client";
import { useAction } from "next-safe-action/hook";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { modals } from "@mantine/modals";
import { v4 as uuidv4 } from "uuid";

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
          withCloseButton: false,
          loading: true,
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
        id: `success-action-notification-${uuidv4()}`,
        withBorder: true,
        autoClose: 5000,
        title: "Erfolgreich",
        message: data.message as string,
        color: "green",
      });

      if (hideModals) {
        modals.closeAll();
      }

      if (redirectUrl) {
        router.push(redirectUrl);
      }

      return data;
    },
    onError(error, input, reset) {
      if (!error) {
        return;
      }

      if (executeNotification) {
        notifications.hide(executeNotification);
      }

      notifications.show({
        id: `error-action-notification-${uuidv4()}`,
        withBorder: true,
        autoClose: 5000,
        title: "Fehler",
        message: error.serverError
          ? error.serverError
          : "Aktion fehlgeschlagen, versuchen sie es später erneut",
        color: "red",
      });
    },
  });
  return { execute, result, status };
};
