import type { User } from "firebase/auth";
import { z } from "zod";
import type { AuthUser } from "@/auth/session/session.types";

const petClaimSchema = z.object({
  id: z.string(),
  name: z.string(),
  breed: z.string(),
  sex: z.enum(["M", "F"]),
  weight: z.number(),
  age: z.number(),
  isCastrated: z.boolean(),
  species: z.string(),
});

const tutorClaimsSchema = z.object({
  role: z.literal("tutor"),
  email: z.string(),
  document: z.string(),
  pets: z.array(petClaimSchema),
});

export async function readTutorSession(user: User | null): Promise<AuthUser | null> {
  const phoneNumber = user?.phoneNumber;
  if (!user || !phoneNumber) return null;
  const token = await user.getIdTokenResult();
  const claims = tutorClaimsSchema.safeParse(token.claims);
  return {
    phoneNumber,
    uid: user.uid,
    name: user.displayName?.trim() ?? "",
    email: claims.success ? claims.data.email : "",
    document: claims.success ? claims.data.document : "",
    pets: claims.success ? claims.data.pets : [],
  };
}
