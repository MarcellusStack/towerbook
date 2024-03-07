import { useActionNotification } from "@hooks/use-action-notification";
import { Button } from "@mantine/core";
import { cancelBooking } from "@accomodations/[id]/_actions";

export const CancelBookingAction = ({ id }: { id: string }) => {
  const { execute, status } = useActionNotification({
    action: cancelBooking,
    executeNotification: "Buchung wird storniert",
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
      Buchung stornieren
    </Button>
  );
};
