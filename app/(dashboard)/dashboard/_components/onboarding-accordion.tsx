import { ButtonLink } from "@/components/button-link";
import { DashboardCard } from "@/components/dashboard-card";
import { Accordion, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconSquare, IconSquareCheck, IconUser } from "@tabler/icons-react";
import React from "react";

export type OnboardingAccordionProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  steps: {
    value: string;
    description: string;
    completed: boolean;
    href: string;
    allowLink: boolean;
  }[];
};

const OnboardingAccordion = ({
  title,
  description,
  icon,
  steps,
}: OnboardingAccordionProps) => {
  return (
    <Stack gap="0" w={512}>
      <DashboardCard
        style={{
          borderBottom: "none",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        title={title}
        icon={icon}
      >
        <Text c="cimmed">{description}</Text>
      </DashboardCard>
      <Accordion variant="contained" defaultValue="Apples">
        {steps.map((item) => (
          <Accordion.Item
            style={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
            key={item.value}
            value={item.value}
          >
            <Accordion.Control
              icon={
                item.completed ? (
                  <ThemeIcon variant="white" color="green" bg="transparent">
                    <IconSquareCheck />
                  </ThemeIcon>
                ) : (
                  <ThemeIcon variant="white" color="gray" bg="transparent">
                    <IconSquare />
                  </ThemeIcon>
                )
              }
            >
              {item.value}
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="xs">
                {item.description}
                <ButtonLink
                  disabled={!item.allowLink}
                  href={item.href}
                  title="Los gehts"
                />
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Stack>
  );
};

export default OnboardingAccordion;
