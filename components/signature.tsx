import React, { useEffect, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { IconPencilX } from "@tabler/icons-react";
import { ActionIcon, Box, Stack, Text } from "@mantine/core";
import { createFormActions } from "@mantine/form";

export const Signature = ({
  formActionId,
  formField,
  label,
  initialValue,
}: {
  formActionId: string;
  formField: string;
  label: string;
  initialValue?: string | null;
}) => {
  const formAction = createFormActions(formActionId);
  const signatureRef = useRef();
  useEffect(() => {
    signatureRef.current &&
      initialValue &&
      signatureRef.current.fromData(initialValue);
  }, []);
  return (
    <Stack gap="2">
      <Text component="label" size="sm" fw={500}>
        {label}
      </Text>
      <Box bg="gray.2" pos="relative">
        <ActionIcon
          pos="absolute"
          top={0}
          left={0}
          mt="4"
          ml="4"
          variant="subtle"
          color="red"
          onClick={() => {
            signatureRef.current.clear();
            formAction.setFieldValue(formField, []);
          }}
        >
          <IconPencilX style={{ width: "70%", height: "70%" }} stroke={1.5} />
        </ActionIcon>
        <SignatureCanvas
          ref={signatureRef}
          onEnd={() => {
            formAction.setFieldValue(formField, signatureRef.current.toData());
          }}
          penColor="black"
          canvasProps={{
            className: "w-full h-full",
          }}
        />
      </Box>
    </Stack>
  );
};
