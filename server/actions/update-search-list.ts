"use server";
import { prisma } from "@server/db";
import { adminAction } from "@server/lib/utils/action-clients";
import { searchListSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { extractTimeFromDate } from "@/utils";

export const updateSearchList = adminAction(
  searchListSchema,
  async (
    {
      id,
      lifeguard,
      firstName,
      lastName,
      age,
      stature,
      height,
      clothing,
      previousIllness,
      firstNameReportingPerson,
      lastNameReportingPerson,
      phoneReportingPerson,
      description,
      lastSeen,
      lastLocation,
      informationPolice,
      informationFireDepartment,
      informationBeachVogt,
      chainDiving,
      searchQuad,
      beachPatrol,
      searchByBoat,
      searchByDrone,
      searchRWC,
      supportOtherBeachArea,
      timeFound,
      handOverTo,
    },
    { user }
  ) => {
    try {
      const searchlist = await prisma.searchList.update({
        where: {
          organizationId: user.organizationId as string,
          id: id,
        },
        data: {
          status: "ongoing",
          lifeguard: { connect: { id: lifeguard.id } },
          firstName: firstName,
          lastName: lastName,
          age: parseInt(age),
          stature: stature,
          height: parseInt(height),
          clothing: clothing,
          previousIllness: previousIllness,
          firstNameReportingPerson: firstNameReportingPerson,
          lastNameReportingPerson: lastNameReportingPerson,
          phoneReportingPerson: phoneReportingPerson,
          description: description,
          lastSeen: extractTimeFromDate(lastSeen),
          lastLocation: lastLocation,
          informationPolice: informationPolice,
          informationFireDepartment: informationFireDepartment,
          informationBeachVogt: informationBeachVogt,
          chainDiving: chainDiving,
          searchQuad: searchQuad,
          beachPatrol: beachPatrol,
          searchByBoat: searchByBoat,
          searchByDrone: searchByDrone,
          searchRWC: searchRWC,
          supportOtherBeachArea: supportOtherBeachArea,
          timeFound: extractTimeFromDate(timeFound),
          handOverTo: handOverTo,
        },
        select: { id: true },
      });

      if (!searchlist.id) {
        throw new Error("Couldnt update searchlist");
      }

      revalidatePath("/", "layout");

      return {
        message: `Der Sucheintrag wurde aktualisiert.`,
      };
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Sucheintrag");
    }
  }
);
