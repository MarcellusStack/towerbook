import { useActionNotification } from "@/hooks/use-action-notification";
import { Button, ButtonProps } from "@mantine/core";
import React from "react";

type ButtonActionProps = ButtonProps & {
  label: string;
  action: any;
  values: { [key: string]: any };
};

export const ButtonAction = ({
  label,
  action,
  values,
  ...props
}: ButtonActionProps) => {
  const { execute, status } = useActionNotification({
    action: action,
    executeNotification: `${label}`,
  });

  return (
    <Button
      loading={status === "executing"}
      onClick={() => {
        execute({ ...values });
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};
