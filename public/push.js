self.addEventListener("push", (event) => {
  const payload = readPayload(event);
  event.waitUntil(deliverPush(payload));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const conversationId = event.notification.data?.conversationId;
  const path = conversationId ? `/conversation/${conversationId}` : "/home";
  event.waitUntil(openConversation(path));
});

function readPayload(event) {
  const empty = { title: "Clínica", body: "", data: { conversationId: "" } };
  if (!event.data) return empty;
  try {
    const parsed = event.data.json();
    return {
      title: typeof parsed.title === "string" ? parsed.title : empty.title,
      body: typeof parsed.body === "string" ? parsed.body : "",
      data: {
        conversationId:
          typeof parsed.data?.conversationId === "string" ? parsed.data.conversationId : "",
      },
    };
  } catch {
    return empty;
  }
}

async function deliverPush(payload) {
  const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
  const visible = windows.some((client) => client.visibilityState === "visible");
  if (visible) {
    for (const client of windows) {
      client.postMessage({ type: "chat-push", conversationId: payload.data.conversationId });
    }
    return;
  }
  if (await isSilenced()) return;
  await self.registration.showNotification(payload.title, {
    body: payload.body,
    data: { conversationId: payload.data.conversationId },
  });
}

async function isSilenced() {
  const until = await readSilenceUntil();
  const end = Date.parse(until);
  return Number.isFinite(end) && end > Date.now();
}

function readSilenceUntil() {
  return new Promise((resolve) => {
    const request = indexedDB.open("keyval-store");
    request.onerror = () => resolve(null);
    request.onupgradeneeded = () => {
      request.transaction.abort();
    };
    request.onsuccess = () => readSilenceRecord(request.result, resolve);
  });
}

function readSilenceRecord(db, resolve) {
  if (!db.objectStoreNames.contains("keyval")) {
    db.close();
    resolve(null);
    return;
  }
  const getRequest = db.transaction("keyval", "readonly").objectStore("keyval").get("notification-silence");
  getRequest.onsuccess = () => {
    const value = getRequest.result;
    db.close();
    resolve(value && typeof value.until === "string" ? value.until : null);
  };
  getRequest.onerror = () => {
    db.close();
    resolve(null);
  };
}

async function openConversation(path) {
  const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
  for (const client of windows) {
    if (new URL(client.url).pathname !== path) continue;
    return client.focus();
  }
  const current = windows[0];
  if (current && "navigate" in current) {
    await current.navigate(path);
    return current.focus();
  }
  return self.clients.openWindow(path);
}
