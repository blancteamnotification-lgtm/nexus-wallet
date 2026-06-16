type TelegramClipboardWebApp = {
  readTextFromClipboard?: (
    callback: (text: string | null) => void,
  ) => void;
};

export async function readClipboardText(): Promise<string | null> {
  const tg = (window as Window & { Telegram?: { WebApp?: TelegramClipboardWebApp } })
    .Telegram?.WebApp;

  if (tg?.readTextFromClipboard) {
    const text = await new Promise<string | null>((resolve) => {
      try {
        tg.readTextFromClipboard?.((clipboardText) => {
          resolve(clipboardText?.trim() ? clipboardText : null);
        });
      } catch {
        resolve(null);
      }
    });

    if (text) return text;
  }

  if (!navigator.clipboard?.readText) {
    return null;
  }

  try {
    const text = await navigator.clipboard.readText();
    return text.trim() ? text : null;
  } catch {
    return null;
  }
}
