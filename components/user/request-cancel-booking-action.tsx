import { useActionNotification } from "@hooks/use-action-notification";
import { Button } from "@mantine/core";
import { requestCancelBooking } from "@accomodations/[id]/_actions";

export const RequestCancelBookingAction = ({ id }: { id: string }) => {
  const { execute, status } = useActionNotification({
    action: requestCancelBooking,
    executeNotification: "Stornierungsanfrage wird erstellt",
    hideModals: true,
  });

  return (
    <Button
      fullWidth
      color="red"
      loading={status === "executing"}
      onClick={() => {
        execute({ id: id });
      }}
    >
      Stornierung Anfragen
    </Button>
  );
};
