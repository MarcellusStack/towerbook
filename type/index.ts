import { type Profile, Tower } from "@prisma/client";

export type ExtendProfileWithTowerProps = Profile & {
  towers: Tower[];
};
