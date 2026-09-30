import { t, setLang, getLang, translatePage } from "./core/i18n.js";
import { isNarrationOn, setNarration, cancelSpeech } from "./core/speech.js";
import storms from "./modes/storms.js";
import thenNow from "./modes/thenNow.js";
import temperature from "./modes/temperature.js";

const MODES = [storms, thenNow, temperature];
const $ = (s) => document.querySelector(s);
let current = null;

function renderTabs() {
  $("#tabs").innerHTML = MODES.map((m) => `<button class="tab" role="tab" id="t-${m.id}" type="button" data-id="${m.id}">${t(m.labelKey)}</button>`).join("");
  $("#tabs").querySelectorAll(".tab").forEach((b) => (b.onclick = () => open(b.dataset.id)));
}

async function open(id) {
  current?.unmount();
  cancelSpeech();
  current = MODES.find((m) => m.id === id);
  document.querySelectorAll(".tab").forEach((b) => {
    const on = b.dataset.id === id;
    b.setAttribute("aria-selected", on);
    b.tabIndex = on ? 0 : -1;
  });
  $("#panel").setAttribute("aria-labelledby", `t-${id}`);
  await current.mount($("#panel"));
}

function renderControls() {
  const on = isNarrationOn();
  $("#voice-btn").textContent = t(on ? "voice.on" : "voice.off");
  $("#voice-btn").setAttribute("aria-pressed", on);
  $("#lang-btn").textContent = t("lang.switch");
  $("#lang-btn").setAttribute("aria-label", t("lang.aria"));
}

$("#voice-btn").onclick = () => { setNarration(!isNarrationOn()); renderControls(); };
$("#lang-btn").onclick = () => {
  setLang(getLang() === "en" ? "bn" : "en");
  translatePage();
  renderTabs();
  renderControls();
  open(current.id);
};

document.addEventListener("keydown", (e) => {
  const digit = { Digit1: 0, Digit2: 1, Digit3: 2 }[e.code];
  if (digit !== undefined) return open(MODES[digit].id);
  if (e.target.tagName === "INPUT") return;
  if (e.code === "KeyN") $("#voice-btn").click();
  else if (e.code === "Space" && e.target.tagName !== "BUTTON") { e.preventDefault(); current.toggle(); }
  else if (current.step && (e.code === "ArrowRight" || e.code === "ArrowLeft")) {
    e.preventDefault();
    current.step(e.code === "ArrowRight" ? 1 : -1);
  }
});

translatePage();
renderTabs();
renderControls();
open(MODES[0].id);
