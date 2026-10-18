import { useEffect, useState } from "react";
import {
  readNotificationSilence,
  writeNotificationSilence,
} from "@/lib/persist/notificationSilence";
import { isSilenceChoice, timedSilence, type SilenceChoice } from "@/utils/silenceChoice";

type SilenceView = {
  choice: SilenceChoice;
  until: string | null;
  ready: boolean;
};

export function useNotificationSilence(uid: string | undefined) {
  const [state, setState] = useState<SilenceView>({
    choice: "never",
    until: null,
    ready: uid === undefined,
  });
  useStoredSilence(uid, setState);

  return {
    choice: state.choice,
    until: state.until,
    ready: state.ready,
    select: (value: string) => {
      chooseSilence(uid, value, setState);
    },
  };
}

function useStoredSilence(
  uid: string | undefined,
  setState: (state: SilenceView) => void,
) {
  useEffect(() => {
    if (!uid) return;
    let active = true;
    void readNotificationSilence().then(
      (stored) => {
        if (active) setState({ ...stored, ready: true });
      },
      () => {
        if (active) setState({ choice: "never", until: null, ready: true });
      },
    );
    return () => {
      active = false;
    };
  }, [uid, setState]);
}

function chooseSilence(
  uid: string | undefined,
  value: string,
  setState: (state: SilenceView) => void,
) {
  if (!isSilenceChoice(value)) return;
  const stored = timedSilence(value);
  setState({ choice: value, until: stored?.until ?? null, ready: true });
  if (!uid) return;
  void writeNotificationSilence(stored);
}
