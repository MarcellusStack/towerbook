"use client";
import { useAction } from "next-safe-action/hook";

import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export type ActionNotificationProps = {
  action: any;
  redirectUrl?: string;
};

export const useActionNotification = ({
  action,
  redirectUrl,
}: ActionNotificationProps) => {
  const router = useRouter();
  const { execute, result, status } = useAction(action, {
    onSuccess(data, input, reset) {
      if (!data) {
        return;
      }
      notifications.show({
        id: "success-action-notification",
        autoClose: 5000,
        title: "Erfolgreich",
        message: data as string,
        color: "green",
      });
      if (redirectUrl) {
        router.push(redirectUrl);
      }
    },
    onError(error, input, reset) {
      if (!error) {
        return;
      }
      notifications.show({
        id: "success-action-notification",
        autoClose: 5000,
        title: "Fehler",
        message: "Aktion fehlgeschlagen, versuchen sie es später erneut",
        color: "red",
      });
    },
  });
  return { execute, result, status };
};
