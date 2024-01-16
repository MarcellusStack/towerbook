import { baseUrl } from "@/utils";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

export const ResetPasswordEmail = (props: {
  receiver: string;
  userId: string;
  token: string;
}) => {
  return (
    <Html>
      <Head />
      <Preview>
        Du hast eine Anfrage zum Zurücksetzen deines Passworts gestellt!
      </Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/branding.png`}
                width="64"
                height="auto"
                alt="Digitales Turmbuch"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-[24px] font-bold text-black">
              Du hast eine Anfrage zum Zurücksetzen deines Passworts gestellt!
            </Heading>
            <Text className="pb-2 text-[20px] leading-[24px] text-black">
              Hallo {props.receiver} 👋
            </Text>
            <Text className="pb-2 text-[20px] leading-[24px] text-black">
              Um dein Passwort zurückzusetzen, klicke auf den untenstehenden
              Link:
            </Text>
            <Button
              className="rounded-sm bg-[#3178c6] text-center text-[12px] font-semibold text-white no-underline py-2 px-6"
              href={`${baseUrl}/reset-password?userId=${props.userId}&token=${props.token}`}
            >
              Passwort zurücksetzen
            </Button>
            <Text className="pb-2 text-xs leading-[24px] text-black">
              Wenn du diese Anfrage nicht gestellt hast, kannst du diese E-Mail
              ignorieren.
            </Text>
            <Container className="mx-auto w-fit pt-4"></Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
