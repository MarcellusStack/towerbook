"use server";
import { prisma } from "@server/db";
import { supabase } from "@server/supabase";
import { adminAction } from "@server/lib/utils/action-clients";
import { userProfileSchema } from "@schemas/index";
import { revalidatePath, revalidateTag } from "next/cache";
import { encrypt } from "@/utils";

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
    { user }
  ) => {
    try {
      const formattedEmail = email.toLowerCase().trim();
      await prisma.$transaction(
        async (tx) => {
          const profile = await tx.profile.update({
            where: {
              organizationId: user.organizationId,
              userId: userId,
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
              email: formattedEmail,
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

          if (!profile.id) {
            throw new Error("Couldnt update profile");
          }

          const { error } = await supabase.auth.admin.updateUserById(
            userId,

            {
              email: formattedEmail,
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
      console.log(error);
      throw new Error("Fehler beim aktualisieren des Benutzer");
    }

    revalidatePath("/", "layout");

    return {
      message: `Der Benutzer ${firstName} ${lastName} wurde aktualisiert`,
    };
  }
);
