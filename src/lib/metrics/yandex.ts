export const YANDEX_METRIKA_ID = 104844437;

export type YandexGoalParams = Record<string, unknown>;

declare global {
  interface Window {
    ym?: (
      counterId: number,
      event: string,
      goal?: string,
      params?: YandexGoalParams,
    ) => void;
  }
}

export function getYandexMetrikaInlineScript(): string {
  return `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      ym(${YANDEX_METRIKA_ID}, "init", {
           clickmap:true,
           trackLinks:true,
           accurateTrackBounce:true,
           webvisor:true
      });
    `;
}

export function trackGoal(goal: string, params?: YandexGoalParams): void {
  if (typeof window === "undefined" || typeof window.ym !== "function") {
    return;
  }

  try {
    window.ym(YANDEX_METRIKA_ID, "reachGoal", goal, params);
  } catch {
    // Ignore analytics failures; product behavior must not depend on metrics.
  }
}

export function disableYandexMetrika(): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.ym?.(YANDEX_METRIKA_ID, "destruct");
  } catch {
    // Consent withdrawal must continue even if the tracker cannot be reached.
  }

  document.getElementById("yandex-metrika")?.remove();
  document
    .querySelectorAll<HTMLScriptElement>(
      'script[src="https://mc.yandex.ru/metrika/tag.js"]',
    )
    .forEach((script) => script.remove());
  delete window.ym;
}
