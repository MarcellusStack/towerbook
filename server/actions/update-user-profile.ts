"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { userProfileSchema } from "@schemas/index";
import { revalidateTag } from "next/cache";

export const updateUserProfile = adminAction(
  userProfileSchema,
  async (
    {
      picture,
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
    { user }
  ) => {
    try {
      await prisma.$transaction(
        async (tx) => {
          const profile = await tx.profile.update({
            where: {
              organizationId: user.organizationId,
              userId: userId,
            },
            data: {
              picture: picture,
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
              email: email,
              phone: phone,
              drkMember: drkMember,
              drkMemberLocation: drkMemberLocation,
              emergencyContactLastName: emergencyContactLastName,
              emergencyContactFirstName: emergencyContactFirstName,
              emergencyContactPhone: emergencyContactPhone,
              bankName: bankName,
              iban: iban,
              bic: bic,
              differentBankholder: differentBankholder,
            },
            select: { id: true },
          });

          if (!profile.id) {
            throw new Error("Couldnt update profile");
          }

          const { error } = await supabase.auth.admin.updateUserById(
            userId,

            {
              email: email,
            }
          );

          if (error) {
            throw new Error("Couldnt update user");
          }
          return profile;
        },
        {
          maxWait: 15000, // default: 2000
          timeout: 15000, // default: 5000
        }
      );
    } catch (error) {
      throw new Error("Fehler beim aktualisieren des Benutzer");
    }

    revalidateTag(userId);
    revalidateTag("users");

    return `Der Benutzer ${firstName} ${lastName} wurde aktualisiert.`;
  }
);
