export const SITE_READY_EVENT = "charbon:ready";
const READY_ATTR = "siteReady";

export function markSiteReady() {
  if (typeof document === "undefined") return;
  document.documentElement.dataset[READY_ATTR] = "1";
  window.dispatchEvent(new Event(SITE_READY_EVENT));
}

export function whenSiteReady(callback: () => void) {
  if (typeof document === "undefined") return () => {};

  if (document.documentElement.dataset[READY_ATTR] === "1") {
    callback();
    return () => {};
  }

  const handler = () => callback();
  window.addEventListener(SITE_READY_EVENT, handler, { once: true });

  return () => window.removeEventListener(SITE_READY_EVENT, handler);
}
