export function requiredPetId(petId: string | undefined): string {
  if (!petId) throw new Error("Missing pet");
  return petId;
}
