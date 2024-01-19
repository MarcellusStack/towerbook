import {
  Title,
  Text,
} from "@mantine/core";
import { ResetPasswordForm } from "@/components/forms/reset-password-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  return (
    <>
      <Title order={1} size="h2">
        Passwort zurücksetzen
      </Title>
      <Text c="dimmed" size="sm">
        Geben Sie ein Neues Passwort ein
      </Text>
      <ResetPasswordForm />
    </>
  );
}
