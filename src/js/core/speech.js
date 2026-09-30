import { getLang } from "./i18n.js";

let enabled = true;

export const isNarrationOn = () => enabled;
export function cancelSpeech() {
  if ("speechSynthesis" in window) speechSynthesis.cancel();
}
export function setNarration(on) {
  enabled = on;
  if (!on) cancelSpeech();
}
/** Announce to screen readers (live region) and, if enabled, speak aloud. */
export function say(text) {
  document.getElementById("live").textContent = text;
  if (!enabled || !("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = getLang() === "bn" ? "bn-BD" : "en-US";
  speechSynthesis.speak(u);
}
