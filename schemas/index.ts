import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email({
    message: "Keine gültige E-Mail.",
  }),
  password: z
    .string()
    .min(6, { message: "Passwort muss mindestens 6 Zeichen lang sein." }),
});

export const organizationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name muss mindestens 3 Zeichen lang sein." }),
});

export const baseUserSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "Name muss mindestens 3 Zeichen lang sein." }),
  lastName: z
    .string()
    .min(3, { message: "Name muss mindestens 3 Zeichen lang sein." }),
  email: z.string().email({ message: "Ungültige E-Mail Adresse" }),
});

export const userProfileSchema = z.intersection(
  baseUserSchema,
  z.object({
    picture: z.string().nullable(),
    gender: z.string().nullable(),
    salutation: z.string().nullable(),
    title: z.string().nullable(),
    birthName: z.string().nullable(),
    birthDate: z.date().nullable(),
    birthPlace: z.string().nullable(),
    street: z.string().nullable(),
    houseNumber: z.string().nullable(),
    zipCode: z.string().nullable(),
    location: z.string().nullable(),
    phone: z.string().nullable(),
    drkMember: z.boolean().nullable(),
    drkMemberLocation: z.string().nullable(),
    emergencyContactLastName: z.string().nullable(),
    emergencyContactFirstName: z.string().nullable(),
    emergencyContactPhone: z.string().nullable(),
    bankName: z.string().nullable(),
    iban: z.string().nullable(),
    bic: z.string().nullable(),
    differentBankholder: z.string().nullable(),
    userId: z.string().min(1, { message: "User Id wird benötigt" }),
  })
);

export const userPermissionsSchema = z.object({
  role: z.array(z.string()),
  userId: z.string().min(1, { message: "User Id wird benötigt" }),
  towers: z.array(z.string()),
});

export const uploadFileSchema = z.object({
  file: z.string().min(1, { message: "Datei wird benötigt" }),
  fileName: z.string().min(1, { message: "Dateiname wird benötigt" }),
  userId: z.string().min(1, { message: "User Id wird benötigt" }),
});

export const createUserSchema = z.intersection(
  baseUserSchema,
  z.object({
    password: z
      .string()
      .min(6, { message: "Passwort muss mindestens 6 Zeichen lang sein." }),
    role: z.string().min(1, { message: "Bitte fügen sie eine Rolle hinzu." }),
  })
);

export const deleteUserSchema = z.object({
  userId: z.string().min(1, { message: "User Id wird benötigt" }),
});
