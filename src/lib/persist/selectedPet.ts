import { useEffect, useState } from "react";
import { del, get, set } from "idb-keyval";
import type { TutorPet } from "@/auth/session/session.types";

type StoredPetState = {
  uid: string | undefined;
  petId: string | undefined;
  ready: boolean;
};

export function usePetSelection(uid: string | undefined, pets: TutorPet[]) {
  const stored = useRememberedPet(uid);
  const [pickedId, setPickedId] = useState<string | undefined>();
  const selectedId = pickedId ?? stored.petId;
  return {
    pet: resolvePet(stored.ready, pets, selectedId),
    ready: stored.ready,
    selectPet: (petId: string) => choosePet(uid, petId, setPickedId),
  };
}

export function clearSelectedPetId(uid: string): Promise<void> {
  return del(selectedPetKey(uid));
}

function useRememberedPet(uid: string | undefined) {
  const [stored, setStored] = useState<StoredPetState>({
    uid: undefined,
    petId: undefined,
    ready: false,
  });
  useStoredPet(uid, setStored);
  if (!uid) return { ready: true, petId: undefined };
  if (!stored.ready || stored.uid !== uid) return { ready: false, petId: undefined };
  return { ready: true, petId: stored.petId };
}

function useStoredPet(
  uid: string | undefined,
  setStored: (state: StoredPetState) => void,
) {
  useEffect(() => {
    if (!uid) return;
    let active = true;
    void readSelectedPetId(uid).then(
      (petId) => {
        if (active) setStored({ uid, petId, ready: true });
      },
      () => {
        if (active) setStored({ uid, petId: undefined, ready: true });
      },
    );
    return () => {
      active = false;
    };
  }, [uid, setStored]);
}

function resolvePet(ready: boolean, pets: TutorPet[], selectedId: string | undefined) {
  if (!ready) return undefined;
  return pets.find((item) => item.id === selectedId) ?? pets[0];
}

function choosePet(
  uid: string | undefined,
  petId: string,
  setPickedId: (petId: string) => void,
) {
  setPickedId(petId);
  if (!uid) return;
  void set(selectedPetKey(uid), petId);
}

async function readSelectedPetId(uid: string): Promise<string | undefined> {
  const value = await get(selectedPetKey(uid));
  return typeof value === "string" ? value : undefined;
}

function selectedPetKey(uid: string): string {
  return `selected-pet:${uid}`;
}
