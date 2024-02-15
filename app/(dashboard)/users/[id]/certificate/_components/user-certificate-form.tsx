"use client";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import { Button, Stack, Fieldset, SimpleGrid, Text } from "@mantine/core";
import { userCertificateSchema } from "@/schemas";
import { useActionNotification } from "@/hooks/use-action-notification";
import { updateUserCertificate } from "@/server/actions/update-user-certificate";
import { UploadInput } from "@components/upload-input";
import { certificateInputs } from "@constants/certificate-inputs";
import { UserCertificateProps } from "@users/[id]/certificate/_actions";
import { UploadCertificate } from "@/components/upload-certificate";
import { UseFormReturnType } from "@mantine/form";

export const UserCertificateForm = ({
  user,
}: {
  user: UserCertificateProps;
}) => {
  const form = useForm({
    name: "user-certificate-form",
    validate: zodResolver(userCertificateSchema),
    initialValues: {
      userId: user.id,
      lifeguardLicense: user.lifeguardLicense,
      lifeguardLicenseExpiration: user.lifeguardLicenseExpiration,
      snorkelLicense: user.snorkelLicense,
      snorkelLicenseExpiration: user.snorkelLicenseExpiration,
      lifeguardWaterRescueService: user.lifeguardWaterRescueService,
      lifeguardWaterRescueServiceExpiration:
        user.lifeguardWaterRescueServiceExpiration,
      waterRescuer: user.waterRescuer,
      waterRescuerExpiration: user.waterRescuerExpiration,
      riverRescuer: user.riverRescuer,
      riverRescuerExpiration: user.riverRescuerExpiration,
      medicalTraining: user.medicalTraining,
      medicalTrainingExpiration: user.medicalTrainingExpiration,
      paramedicHelper: user.paramedicHelper,
      paramedicHelperExpiration: user.paramedicHelperExpiration,
      paramedic: user.paramedic,
      paramedicExpiration: user.paramedicExpiration,
      paramedicAssistance: user.paramedicAssistance,
      paramedicAssistanceExpiration: user.paramedicAssistanceExpiration,
      paramedicEmergency: user.paramedicEmergency,
      paramedicEmergencyExpiration: user.paramedicEmergencyExpiration,
      physician: user.physician,
      physicianExpiration: user.physicianExpiration,
      physicianEmergency: user.physicianEmergency,
      physicianEmergencyExpiration: user.physicianEmergencyExpiration,
      squadLeader: user.squadLeader,
      squadLeaderExpiration: user.squadLeaderExpiration,
      groupLeader: user.groupLeader,
      groupLeaderExpiration: user.groupLeaderExpiration,
      guardLeader: user.guardLeader,
      guardLeaderExpiration: user.guardLeaderExpiration,
      trainLeader: user.trainLeader,
      trainLeaderExpiration: user.trainLeaderExpiration,
      carDrivingLicense: user.carDrivingLicense,
      carDrivingLicenseExpiration: user.carDrivingLicenseExpiration,
      blueLightInstruction: user.blueLightInstruction,
      blueLightInstructionExpiration: user.blueLightInstructionExpiration,
      boatmanLake: user.boatmanLake,
      boatmanLakeExpiration: user.boatmanLakeExpiration,
      boatmanInland: user.boatmanInland,
      boatmanInlandExpiration: user.boatmanInlandExpiration,
      lifeboatOperator: user.lifeboatOperator,
      lifeboatOperatorExpiration: user.lifeboatOperatorExpiration,
      rwcPilotStage: user.rwcPilotStage,
      rwcPilotStageExpiration: user.rwcPilotStageExpiration,
      srcCertificate: user.srcCertificate,
      srcCertificateExpiration: user.srcCertificateExpiration,
      bosCertificate: user.bosCertificate,
      bosCertificateExpiration: user.bosCertificateExpiration,
      droneClass: user.droneClass,
      droneClassExpiration: user.droneClassExpiration,
      volunteerDataSheet: user.volunteerDataSheet,
      volunteerDataSheetExpiration: user.volunteerDataSheetExpiration,
      youthLeaderCard: user.youthLeaderCard,
      youthLeaderCardExpiration: user.youthLeaderCardExpiration,
      instructorSwimmer: user.instructorSwimmer,
      instructorSwimmerExpiration: user.instructorSwimmerExpiration,
      lifeguardInstructor: user.lifeguardInstructor,
      lifeguardInstructorExpiration: user.lifeguardInstructorExpiration,
      instructorWaterRescuer: user.instructorWaterRescuer,
      instructorWaterRescuerExpiration: user.instructorWaterRescuerExpiration,
      instructorMedicalService: user.instructorMedicalService,
      instructorMedicalServiceExpiration:
        user.instructorMedicalServiceExpiration,
      guardWalker: user.guardWalker,
      guardWalkerExpiration: user.guardWalkerExpiration,
      boat: user.boat,
      boatExpiration: user.boatExpiration,
      car: user.car,
      carExpiration: user.carExpiration,
      rwc: user.rwc,
      rwcExpiration: user.rwcExpiration,
      guardLeaderInstruction: user.guardLeaderInstruction,
      guardLeaderInstructionExpiration: user.guardLeaderInstructionExpiration,
    },
  });

  const { execute, result, status } = useActionNotification({
    action: updateUserCertificate,
    executeNotification: `Benutzer wird aktualisiert`,
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
                <UploadCertificate
                  label={input.label}
                  form={form}
                  inputProp={input.inputProp}
                  inputExpirationProp={input.inputExpirationProp}
                  userId={user.id}
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
