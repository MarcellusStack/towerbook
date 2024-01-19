"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { userProfileSchema } from "@schemas/index";
import { revalidatePath } from "next/cache";
import { encrypt, toLowercaseAndTrim } from "@/utils";

export const updateUserProfile = adminAction(
  userProfileSchema,
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
      email,
      phone,
      drkMember,
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
              email: toLowercaseAndTrim(email),
              phone: phone,
              drkMember: drkMember,
              drkMemberLocation: drkMemberLocation,
              emergencyContactLastName: emergencyContactLastName,
              emergencyContactFirstName: emergencyContactFirstName,
              emergencyContactPhone: emergencyContactPhone,
              bankName: bankName,
              iban: encrypt(iban),
              bic: encrypt(bic),
              differentBankholder: differentBankholder,
            },
            select: { id: true },
          });

          if (!user) {
            throw new Error("User konnte nicht aktualisiert werden");
          }

          const { error } = await supabase.auth.admin.updateUserById(
            user.id,

            {
              email: toLowercaseAndTrim(email),
            }
          );

          if (error) {
            throw new Error("Couldnt update user");
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
      message: `Der Benutzer ${firstName} ${lastName} wurde aktualisiert`,
    };
  }
);
