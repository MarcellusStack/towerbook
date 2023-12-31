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

export const downloadFileSchema = z.object({
  fileName: z.string().min(1, { message: "Dateiname wird benötigt" }),
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

export const createTowerSchema = z.object({
  name: z.string().min(1, { message: "Bitte fügen sie einen Namen hinzu." }),
  type: z.string().min(1, { message: "Bitte fügen sie ein Typ hinzu." }),
  number: z
    .string()
    .min(1, { message: "Bitte fügen sie eine Turmnummer hinzu." }),
  location: z
    .string()
    .min(1, { message: "Bitte fügen sie einen Standort hinzu." }),
});

export const deleteUserSchema = z.object({
  userId: z.string().min(1, { message: "User Id wird benötigt" }),
});

export const deleteSchema = z.object({
  id: z.string().min(1, { message: "Id wird benötigt" }),
});

export const userCertificateSchema = z.object({
  userId: z.string().min(1, { message: "User Id wird benötigt" }),
  lifeguardLicense: z.string().nullable(),
  snorkelLicense: z.string().nullable(),
  lifeguardWaterRescueService: z.string().nullable(),
  waterRescuer: z.string().nullable(),
  riverRescuer: z.string().nullable(),
  medicalTraining: z.string().nullable(),
  paramedicHelper: z.string().nullable(),
  paramedic: z.string().nullable(),
  paramedicAssistance: z.string().nullable(),
  paramedicEmergency: z.string().nullable(),
  physician: z.string().nullable(),
  physicianEmergency: z.string().nullable(),
  squadLeader: z.string().nullable(),
  groupLeader: z.string().nullable(),
  guardLeader: z.string().nullable(),
  trainLeader: z.string().nullable(),
  carDrivingLicense: z.string().nullable(),
  blueLightInstruction: z.string().nullable(),
  boatmanLake: z.string().nullable(),
  boatmanInland: z.string().nullable(),
  lifeboatOperator: z.string().nullable(),
  rwcPilotStage: z.string().nullable(),
  srcCertificate: z.string().nullable(),
  bosCertificate: z.string().nullable(),
  droneClass: z.string().nullable(),
  volunteerDataSheet: z.string().nullable(),
  youthLeaderCard: z.string().nullable(),
  instructorSwimmer: z.string().nullable(),
  lifeguardInstructor: z.string().nullable(),
  instructorWaterRescuer: z.string().nullable(),
  instructorMedicalService: z.string().nullable(),
  guardWalker: z.string().nullable(),
  boat: z.string().nullable(),
  car: z.string().nullable(),
  rwc: z.string().nullable(),
  guardLeaderInstruction: z.string().nullable(),
});
