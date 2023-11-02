import { prisma } from "@server/db";
import { authFilterQuery } from "@server/lib/utils/query-clients";
import { unstable_cache } from "next/cache";

export const getUserCertificate = authFilterQuery(async (search, user) => {
  const userData = await unstable_cache(
    async (search) => {
      return await prisma.profile.findFirst({
        where: {
          organizationId: user.organizationId,
          userId: search,
        },
        select: {
          userId: true,
          lifeguardLicense: true,
          snorkelLicense: true,
          lifeguardWaterRescueService: true,
          waterRescuer: true,
          riverRescuer: true,
          medicalTraining: true,
          paramedicHelper: true,
          paramedic: true,
          paramedicAssistance: true,
          paramedicEmergency: true,
          physician: true,
          physicianEmergency: true,
          squadLeader: true,
          groupLeader: true,
          guardLeader: true,
          trainLeader: true,
          carDrivingLicense: true,
          blueLightInstruction: true,
          boatmanLake: true,
          boatmanInland: true,
          lifeboatOperator: true,
          rwcPilotStage: true,
          srcCertificate: true,
          bosCertificate: true,
          droneClass: true,
          volunteerDataSheet: true,
          youthLeaderCard: true,
          instructorSwimmer: true,
          lifeguardInstructor: true,
          instructorWaterRescuer: true,
          instructorMedicalService: true,
          guardWalker: true,
          boat: true,
          car: true,
          rwc: true,
          guardLeaderInstruction: true,
        },
      });
    },
    [],
    {
      tags: [search],
      revalidate: 1,
    }
  )(search);
  return userData;
});
