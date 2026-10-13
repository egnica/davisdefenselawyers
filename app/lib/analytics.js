// Only emit measurement events on the production website.
export function trackEvent(name, parameters = {}) {
  if (typeof window === "undefined") return;
  if (window.location.hostname !== "www.davisdefenselawyers.com" && window.location.hostname !== "davisdefenselawyers.com") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, parameters);
}
