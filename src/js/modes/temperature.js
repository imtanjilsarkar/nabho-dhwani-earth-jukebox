import { TEMPERATURE as DATA } from "../../data/temperature.js";
import { playTone } from "../core/audio.js";
import { say, cancelSpeech } from "../core/speech.js";
import { t } from "../core/i18n.js";

const MIN = Math.min(...DATA.map((d) => d.anomaly));
const MAX = Math.max(...DATA.map((d) => d.anomaly));
const STEP_MS = 1000;

export default {
  id: "temp",
  labelKey: "tab.temp",
  i: 0,
  playing: false,

  mount(root) {
    this.i = 0;
    this.playing = false;
    root.innerHTML = `
      <div class="chart" aria-hidden="true">${DATA.map((d, k) =>
        `<div class="bar${d.anomaly > 0 ? " hot" : ""}" style="height:${Math.max(3, ((d.anomaly - MIN) / (MAX - MIN)) * 100)}%" data-i="${k}"></div>`).join("")}</div>
      <div class="read"><b></b><span></span><p></p></div>
      <div class="steps">
        <button class="chip" id="prev" type="button" aria-label="${t("prev")}">◀</button>
        <button class="play" id="tplay" type="button"></button>
        <button class="chip" id="next" type="button" aria-label="${t("next")}">▶</button>
      </div>
      <input class="tr" type="range" min="0" max="${DATA.length - 1}" value="0" aria-label="${t("year")}">
      <p class="how">${t("how.temp")}</p>`;
    this.root = root;
    this.$ = (s) => root.querySelector(s);
    root.querySelectorAll(".bar").forEach((b) => (b.onclick = () => { this.pause(); this.go(+b.dataset.i, true); }));
    this.$("#prev").onclick = () => this.step(-1);
    this.$("#next").onclick = () => this.step(1);
    this.$("#tplay").onclick = () => this.toggle();
    this.$(".tr").oninput = (e) => { this.pause(); this.go(+e.target.value, true); };
    this.go(0, false);
    this.renderButton();
  },

  trend(i) {
    if (i === 0) return t("trend.start");
    const d = DATA[i].anomaly - DATA[i - 1].anomaly;
    return t(Math.abs(d) < 0.03 ? "trend.same" : d > 0 ? "trend.up" : "trend.down");
  },

  go(i, sound) {
    if (i < 0 || i >= DATA.length) return;
    this.i = i;
    const { year, anomaly } = DATA[i];
    const value = `${anomaly >= 0 ? "+" : ""}${anomaly.toFixed(2)}`;
    const trend = this.trend(i);
    this.root.querySelectorAll(".bar").forEach((b, k) => b.classList.toggle("on", k === i));
    this.$(".read b").textContent = year;
    this.$(".read span").textContent = `${value} °C`;
    this.$(".read p").textContent = trend;
    this.$(".tr").value = i;
    this.$(".tr").setAttribute("aria-valuetext", `${year}, ${value} °C`);
    if (!sound) return;
    playTone(220 + ((anomaly - MIN) / (MAX - MIN)) * 660);
    say(t("temp.line", { year, value, trend }));
  },

  step(dir) { this.pause(); this.go(this.i + dir, true); },
  toggle() { this.playing ? this.pause() : this.play(); },

  play() {
    if (this.i >= DATA.length - 1) this.i = -1;
    this.playing = true;
    this.renderButton();
    const advance = () => {
      this.go(this.i + 1, true);
      if (this.i >= DATA.length - 1) return this.pause();
      this.timer = setTimeout(advance, STEP_MS);
    };
    advance();
  },

  pause() {
    this.playing = false;
    clearTimeout(this.timer);
    this.renderButton();
  },

  renderButton() {
    const b = this.$?.("#tplay");
    if (!b) return;
    b.textContent = this.playing ? "❚❚" : "▶";
    b.setAttribute("aria-label", t(this.playing ? "pause" : "play"));
  },

  unmount() { this.pause(); cancelSpeech(); },
};
