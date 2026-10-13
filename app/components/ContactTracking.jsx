"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

export default function ContactTracking() {
  useEffect(() => {
    function onClick(event) {
      const link = event.target.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        trackEvent("click_to_call", { contact_method: "phone" });
      } else if (href.startsWith("sms:")) {
        trackEvent("click_to_text", { contact_method: "text" });
      } else if (href.startsWith("mailto:")) {
        trackEvent("click_to_email", { contact_method: "email" });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
