import { Box, Flex, Stack } from "@mantine/core";
import React from "react";
import { Branding } from "@components/branding";
import Image from "next/image";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="h-screen">
      <Flex className="h-full w-full">
        <Stack className="w-full md:w-1/2" p="md" justify="space-between">
          <Branding />
          <Stack className="max-w-[400px] min-w-[265px] self-center" gap="md">
            {children}
          </Stack>
          <Box />
        </Stack>
        <Box className="hidden md:block md:w-1/2 relative">
          <Image
            src="/login-bg.jpg"
            fill
            className="object-cover"
            alt="auth background illustration"
            placeholder="blur"
            blurDataURL="L9Fs48?v00I900D$~px^8wWF^$of"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthLayout;
