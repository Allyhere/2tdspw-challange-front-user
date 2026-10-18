import type { TutorPet } from "@/auth/session/session.types";
import type { ConversationSummary } from "@/data/clinicChat/conversation.types";

export type HomePet = {
  id: string;
  name: string;
  breed: string;
  weight: number | null;
  age: number | null;
  profile: TutorPet | null;
};

export function homePets(ownerPets: TutorPet[], conversations: ConversationSummary[]): HomePet[] {
  const pets = new Map<string, HomePet>();
  for (const pet of ownerPets) pets.set(pet.id, fromOwner(pet));
  for (const item of conversations) {
    if (!pets.has(item.pet.id)) pets.set(item.pet.id, fromConversation(item));
  }
  return [...pets.values()];
}

function fromOwner(pet: TutorPet): HomePet {
  return {
    id: pet.id,
    name: pet.name,
    breed: pet.breed,
    weight: pet.weight,
    age: pet.age,
    profile: pet,
  };
}

function fromConversation(item: ConversationSummary): HomePet {
  return {
    id: item.pet.id,
    name: item.pet.name,
    breed: item.pet.breed,
    weight: item.pet.weight,
    age: item.pet.age,
    profile: null,
  };
}
