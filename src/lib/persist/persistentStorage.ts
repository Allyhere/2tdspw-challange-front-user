let requested = false;

export function requestPersistentStorage(): void {
  if (requested || !navigator.storage?.persist) return;
  requested = true;
  void navigator.storage.persist();
}
