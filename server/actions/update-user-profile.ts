"use server";
import { prisma } from "@server/db";
import { authAction } from "@server/lib/utils/action-clients";
import { userAccountSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { encrypt } from "@/utils";
import { clerkClient } from "@clerk/nextjs";

export const updateUserAccount = authAction("updateUser")(
  userAccountSchema,
  async (
    {
      gender,
      firstName,
      lastName,
      salutation,
      title,
      birthName,
      birthDate,
      birthPlace,
      street,
      houseNumber,
      zipCode,
      location,
      phone,
      drkMember,
      drkEmployee,
      drkMemberLocation,
      emergencyContactLastName,
      emergencyContactFirstName,
      emergencyContactPhone,
      bankName,
      iban,
      bic,
      differentBankholder,
      userId,
    },
    { session }
  ) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const user = await tx.user.update({
            where: {
              organizationId: session.organizationId,
              id: userId,
            },
            data: {
              gender: gender,
              firstName: firstName,
              lastName: lastName,
              salutation: salutation,
              title: title,
              birthName: birthName,
              birthDate: new Date(birthDate as Date),
              birthPlace: birthPlace,
              street: street,
              houseNumber: houseNumber,
              zipCode: zipCode,
              location: location,
              phone: phone,
              drkMember: drkMember,
              drkEmployee: drkEmployee,
              drkMemberLocation: drkMemberLocation,
              emergencyContactLastName: emergencyContactLastName,
              emergencyContactFirstName: emergencyContactFirstName,
              emergencyContactPhone: emergencyContactPhone,
              bankName: bankName,
              iban: encrypt(iban),
              bic: encrypt(bic),
              differentBankholder: differentBankholder,
            },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              birthDate: true,
            },
          });

          if (!user) {
            throw new Error("Benutzer konnte nicht aktualisiert werden");
          }

          const syncClerkAccount = await clerkClient.users.updateUser(user.id, {
            firstName: user.firstName,
            lastName: user.lastName,
          });

          if (!syncClerkAccount) {
            throw new Error("Benutzer konnte nicht aktualisiert werden");
          }
        },
        {
          maxWait: 15000,
          timeout: 15000,
        }
      );
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Benutzer");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Benutzer wurde aktualisiert`,
    };
  }
);
