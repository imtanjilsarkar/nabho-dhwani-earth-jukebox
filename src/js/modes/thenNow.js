import { ARAL } from "../../data/aral.js";
import { SweepPlayer } from "../components/sweepPlayer.js";
import { say } from "../core/speech.js";
import { t } from "../core/i18n.js";

export default {
  id: "then",
  labelKey: "tab.then",
  player: null,

  async mount(root) {
    root.innerHTML = `<div class="player"></div><div class="meta"><h2>${t("aral.title")}</h2><p>${t("aral.note")}</p></div><p class="how">${t("how.then")}</p>`;
    this.player = new SweepPlayer(root.querySelector(".player"));
    const [before, after] = await this.player.load([
      { src: ARAL.before, pan: -1, tag: t("before"), alt: `${t("aral.title")}, ${t("before")}` },
      { src: ARAL.after, pan: 1, tag: t("now"), alt: `${t("aral.title")}, ${t("now")}` },
    ]);
    const d = after.mean - before.mean;
    say(`${t("aral.title")}. ${t(d < -0.05 ? "cmp.quieter" : d > 0.05 ? "cmp.louder" : "cmp.same")}`);
  },

  toggle() { this.player?.toggle(); },
  unmount() { this.player?.destroy(); },
};
