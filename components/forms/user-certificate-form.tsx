"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Button, Stack, Fieldset, SimpleGrid, Text } from "@mantine/core";
import { userCertificateSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";

import { type User } from "@prisma/client";
import { roles } from "@/constants/roles";
import { updateUserCertificate } from "@/server/actions/update-user-certificate";
import { uploadFile } from "@/server/actions/upload-file";
import { convertBase64 } from "@/utils";
import { IconDownload, IconListSearch } from "@tabler/icons-react";
import { UploadInput } from "@components/upload-input";
import { certificateInputs } from "@constants/certificate-inputs";

export const UserCertificateForm = ({ user }: { user: User }) => {
  const form = useForm({
    validate: zodResolver(userCertificateSchema),
    initialValues: {
      userId: user.id,
      lifeguardLicense: user.lifeguardLicense,
      snorkelLicense: user.snorkelLicense,
      lifeguardWaterRescueService: user.lifeguardWaterRescueService,
      waterRescuer: user.waterRescuer,
      riverRescuer: user.riverRescuer,
      medicalTraining: user.medicalTraining,
      paramedicHelper: user.paramedicHelper,
      paramedic: user.paramedic,
      paramedicAssistance: user.paramedicAssistance,
      paramedicEmergency: user.paramedicEmergency,
      physician: user.physician,
      physicianEmergency: user.physicianEmergency,
      squadLeader: user.squadLeader,
      groupLeader: user.groupLeader,
      guardLeader: user.guardLeader,
      trainLeader: user.trainLeader,
      carDrivingLicense: user.carDrivingLicense,
      blueLightInstruction: user.blueLightInstruction,
      boatmanLake: user.boatmanLake,
      boatmanInland: user.boatmanInland,
      lifeboatOperator: user.lifeboatOperator,
      rwcPilotStage: user.rwcPilotStage,
      srcCertificate: user.srcCertificate,
      bosCertificate: user.bosCertificate,
      droneClass: user.droneClass,
      volunteerDataSheet: user.volunteerDataSheet,
      youthLeaderCard: user.youthLeaderCard,
      instructorSwimmer: user.instructorSwimmer,
      lifeguardInstructor: user.lifeguardInstructor,
      instructorWaterRescuer: user.instructorWaterRescuer,
      instructorMedicalService: user.instructorMedicalService,
      guardWalker: user.guardWalker,
      boat: user.boat,
      car: user.car,
      rwc: user.rwc,
      guardLeaderInstruction: user.guardLeaderInstruction,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updateUserCertificate,
    executeNotification: `Benutzer ${user.firstName} ${user.lastName} wird aktualisiert`,
  });

  return (
    <form onSubmit={form.onSubmit((values) => execute(values))}>
      <Stack gap="md">
        {certificateInputs.map((section) => (
          <Fieldset
            id={section.sectionAnchor}
            legend={
              <Text fw={700} size="xl">
                {section.section}
              </Text>
            }
          >
            <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
              {section.inputs.map((input) => (
                <UploadInput
                  label={input.label}
                  placeholder={
                    form.getInputProps(input.inputProp).value ??
                    "Datei hochladen"
                  }
                  form={form}
                  inputValue={form.getInputProps(input.inputProp).value}
                  inputProp={input.inputProp}
                  userId={user.id}
                  fileType="pdf"
                />
              ))}
            </SimpleGrid>
          </Fieldset>
        ))}

        <Button
          loading={status === "executing"}
          type="submit"
          className="self-start"
        >
          Speichern
        </Button>
      </Stack>
    </form>
  );
};
