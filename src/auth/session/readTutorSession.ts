import type { User } from "firebase/auth";
import type { AuthUser } from "@/auth/session/session.types";

export async function readTutorSession(user: User | null): Promise<AuthUser | null> {
  const phoneNumber = user?.phoneNumber;
  if (!user || !phoneNumber) return null;
  return {
    phoneNumber,
    uid: user.uid,
    name: "",
    email: "",
    document: "",
    pets: [],
  };
}
