import { STORMS } from "../../data/storms.js";
import { SweepPlayer } from "../components/sweepPlayer.js";
import { say } from "../core/speech.js";
import { t } from "../core/i18n.js";

const position = (peak) => t(peak < 0.34 ? "left" : peak > 0.66 ? "right" : "center");
const level = (mean) => t(mean > 0.55 ? "heavy" : mean > 0.3 ? "moderate" : "light");

export default {
  id: "storms",
  labelKey: "tab.storms",
  player: null,
  index: 0,

  mount(root) {
    root.innerHTML = `<div class="player"></div><div class="meta"><h2></h2><p></p></div><div class="gallery"></div><p class="how">${t("how.storms")}</p>`;
    this.root = root;
    this.player = new SweepPlayer(root.querySelector(".player"));
    return this.open(false);
  },

  async open(announce) {
    const s = STORMS[this.index];
    this.root.querySelector(".gallery").innerHTML = STORMS.map((x, i) =>
      `<button class="thumb" type="button" aria-pressed="${i === this.index}" aria-label="${x.name}"><img src="${x.src}" alt=""><span>${x.name.replace("Tropical Cyclone", "Cyclone")}</span></button>`).join("");
    this.root.querySelectorAll(".thumb").forEach((b, i) => (b.onclick = () => { this.index = i; this.open(true); }));
    this.root.querySelector("h2").textContent = s.name;
    this.root.querySelector(".meta p").textContent = s.place;
    const [data] = await this.player.load([{ src: s.src, pan: 0, alt: `${s.name}. ${s.place}` }]);
    if (announce) say(`${s.name}. ${s.place}. ${t("summary", { pos: position(data.peak), level: level(data.mean) })}`);
  },

  toggle() { this.player?.toggle(); },
  unmount() { this.player?.destroy(); },
};
