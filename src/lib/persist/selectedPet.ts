import { useEffect, useState } from "react";
import { get, set } from "idb-keyval";

type StoredPetState = {
  uid: string | undefined;
  petId: string | undefined;
  ready: boolean;
};

export function usePetSelection<T extends { id: string }>(uid: string | undefined, pets: T[]) {
  const stored = useRememberedPet(uid);
  const [pickedId, setPickedId] = useState<string | undefined>();
  const selectedId = pickedId ?? stored.petId;
  return {
    pet: resolvePet(stored.ready, pets, selectedId),
    ready: stored.ready,
    selectPet: (petId: string) => choosePet(uid, petId, setPickedId),
  };
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

function resolvePet<T extends { id: string }>(ready: boolean, pets: T[], selectedId: string | undefined) {
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
  void set(`selected-pet:${uid}`, petId);
}

async function readSelectedPetId(uid: string): Promise<string | undefined> {
  const value = await get(`selected-pet:${uid}`);
  return typeof value === "string" ? value : undefined;
}
