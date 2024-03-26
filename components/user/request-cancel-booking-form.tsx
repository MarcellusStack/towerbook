import { useActionNotification } from "@hooks/use-action-notification";
import { Button, Stack, TextInput } from "@mantine/core";
import { requestCancelBooking } from "@accomodations/[id]/_actions";
import { useForm, zodResolver } from "@mantine/form";
import { requestCancelBookingSchema } from "@/schemas";

export const RequestCancelBookingForm = ({ id }: { id: string }) => {
  const form = useForm({
    validate: zodResolver(requestCancelBookingSchema),
    initialValues: {
      id: id,
      cancelComment: "",
    },
  });
  const { execute, status } = useActionNotification({
    action: requestCancelBooking,
    executeNotification: "Stornierungsanfrage wird erstellt",
    hideModals: true,
  });

  return (
    <form onSubmit={form.onSubmit((values) => execute(values))}>
      <Stack gap="sm">
        <TextInput label="Bemerkung" {...form.getInputProps("cancelComment")} />
        <Button
          type="submit"
          fullWidth
          color="red"
          loading={status === "executing"}
        >
          Stornierung Anfragen
        </Button>
      </Stack>
    </form>
  );
};
