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