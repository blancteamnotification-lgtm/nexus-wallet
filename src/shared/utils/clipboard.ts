type TelegramClipboardWebApp = {
  readTextFromClipboard?: (
    callback: (text: string | null) => void,
  ) => void;
  onEvent?: (event: string, handler: (payload: { data?: string }) => void) => void;
  offEvent?: (event: string, handler: (payload: { data?: string }) => void) => void;
};

const CLIPBOARD_TIMEOUT_MS = 500;

function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  fallback: T,
): Promise<T> {
  return new Promise((resolve) => {
    const timer = window.setTimeout(() => resolve(fallback), timeoutMs);

    promise
      .then((value) => {
        window.clearTimeout(timer);
        resolve(value);
      })
      .catch(() => {
        window.clearTimeout(timer);
        resolve(fallback);
      });
  });
}

function readTelegramClipboard(): Promise<string | null> {
  const tg = (window as Window & { Telegram?: { WebApp?: TelegramClipboardWebApp } })
    .Telegram?.WebApp;

  if (!tg?.readTextFromClipboard) {
    return Promise.resolve(null);
  }

  return withTimeout(
    new Promise<string | null>((resolve) => {
      const onClipboardText = (payload: { data?: string }) => {
        tg.offEvent?.("clipboardTextReceived", onClipboardText);
        const text = payload.data?.trim();
        resolve(text ? payload.data! : null);
      };

      try {
        tg.onEvent?.("clipboardTextReceived", onClipboardText);
        tg.readTextFromClipboard?.((clipboardText) => {
          tg.offEvent?.("clipboardTextReceived", onClipboardText);
          resolve(clipboardText?.trim() ? clipboardText : null);
        });
      } catch {
        tg.offEvent?.("clipboardTextReceived", onClipboardText);
        resolve(null);
      }
    }),
    CLIPBOARD_TIMEOUT_MS,
    null,
  );
}

function readNavigatorClipboard(): Promise<string | null> {
  if (!navigator.clipboard?.readText) {
    return Promise.resolve(null);
  }

  return withTimeout(
    navigator.clipboard
      .readText()
      .then((text) => (text.trim() ? text : null))
      .catch(() => null),
    CLIPBOARD_TIMEOUT_MS,
    null,
  );
}

export function pasteViaHiddenEditable(): Promise<string | null> {
  return new Promise((resolve) => {
    const editable = document.createElement("div");
    editable.contentEditable = "true";
    editable.setAttribute("aria-hidden", "true");
    editable.style.cssText =
      "position:fixed;left:-9999px;top:0;width:1px;height:1px;opacity:0;pointer-events:none";

    let settled = false;

    const finish = (text: string | null) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      editable.remove();
      resolve(text?.trim() ? text : null);
    };

    const timeout = window.setTimeout(() => {
      finish(editable.textContent?.trim() ? editable.textContent : null);
    }, CLIPBOARD_TIMEOUT_MS);

    editable.addEventListener(
      "paste",
      (event) => {
        event.preventDefault();
        const text =
          event.clipboardData?.getData("text/plain") ?? editable.textContent ?? "";
        finish(text);
      },
      { once: true },
    );

    document.body.appendChild(editable);
    editable.focus();

    try {
      document.execCommand("paste");
    } catch {
      finish(null);
    }
  });
}

export function pasteViaExecCommand(
  textarea: HTMLTextAreaElement,
): Promise<string | null> {
  return new Promise((resolve) => {
    const before = textarea.value;
    let settled = false;

    const finish = (text: string | null) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(text?.trim() ? text : null);
    };

    const timeout = window.setTimeout(() => {
      if (textarea.value !== before) {
        finish(textarea.value);
        return;
      }
      finish(null);
    }, CLIPBOARD_TIMEOUT_MS);

    const onPaste = (event: ClipboardEvent) => {
      event.preventDefault();
      const text = event.clipboardData?.getData("text/plain") ?? "";
      finish(text);
    };

    const cleanup = () => {
      window.clearTimeout(timeout);
      textarea.removeEventListener("paste", onPaste);
    };

    textarea.addEventListener("paste", onPaste);
    textarea.focus();

    try {
      document.execCommand("paste");
    } catch {
      finish(null);
    }
  });
}

export async function readClipboardText(
  textarea?: HTMLTextAreaElement | null,
): Promise<string | null> {
  const fromHidden = await pasteViaHiddenEditable();
  if (fromHidden) return fromHidden;

  if (textarea) {
    const fromExec = await pasteViaExecCommand(textarea);
    if (fromExec) return fromExec;
  }

  const fromTelegram = await readTelegramClipboard();
  if (fromTelegram) return fromTelegram;

  return readNavigatorClipboard();
}
