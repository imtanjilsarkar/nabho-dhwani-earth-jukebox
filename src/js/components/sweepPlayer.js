import { analyze, loadImage, COLUMNS } from "../core/analyzer.js";
import { createVoice, now } from "../core/audio.js";
import { t } from "../core/i18n.js";

const DURATION = 10; // seconds for one left-to-right sweep

/** Image stage + transport that "reads" one or two images as sound, left to right. */
export class SweepPlayer {
  constructor(root) {
    this.root = root;
    this.pos = 0;
    this.playing = false;
    this.voices = [];
    this.frames = [];
    root.innerHTML = `
      <div class="stage"></div>
      <div class="transport">
        <button class="play" type="button"></button>
        <input type="range" min="0" max="1000" value="0" aria-label="Position">
        <span class="time"></span>
      </div>`;
    this.stage = root.querySelector(".stage");
    this.btn = root.querySelector(".play");
    this.scrub = root.querySelector("input");
    this.time = root.querySelector(".time");
    this.btn.onclick = () => this.toggle();
    this.scrub.oninput = () => {
      this.pos = this.scrub.value / 1000;
      if (this.playing) this.startTime = now() - this.pos * DURATION;
      this.render();
    };
    this.renderButton();
  }

  /** frames: [{ src, pan, tag, alt }] → resolves to per-frame analysis. */
  async load(frames) {
    this.stop();
    this.pos = 0;
    this.frames = frames;
    this.stage.className = `stage n${frames.length}`;
    this.stage.innerHTML = frames
      .map((f) => `<div class="frame"><img src="${f.src}" alt="${f.alt ?? ""}">${f.tag ? `<span class="tag">${f.tag}</span>` : ""}<i class="scan"></i></div>`)
      .join("");
    this.analysis = await Promise.all(frames.map(async (f) => analyze(await loadImage(f.src))));
    this.render();
    return this.analysis;
  }

  toggle() { this.playing ? this.stop() : this.play(); }

  play() {
    if (!this.analysis) return;
    if (this.pos >= 1) this.pos = 0;
    this.voices = this.analysis.map((data, i) => ({ voice: createVoice(this.frames[i].pan ?? 0), data }));
    this.startTime = now() - this.pos * DURATION;
    this.playing = true;
    this.renderButton();
    this.tick();
  }

  stop() {
    this.voices.forEach((v) => v.voice.stop());
    this.voices = [];
    this.playing = false;
    cancelAnimationFrame(this.raf);
    this.renderButton();
  }

  tick() {
    if (!this.playing) return;
    this.pos = (now() - this.startTime) / DURATION;
    if (this.pos >= 1) { this.pos = 1; this.render(); this.stop(); return; }
    this.render();
    const c = Math.min(COLUMNS - 1, Math.floor(this.pos * COLUMNS));
    this.voices.forEach(({ voice, data }) => voice.set(data.freq[c], 0.05 + data.amp[c] * 0.4));
    this.raf = requestAnimationFrame(() => this.tick());
  }

  render() {
    this.scrub.value = this.pos * 1000;
    this.time.textContent = `${Math.floor(this.pos * DURATION)}s / ${DURATION}s`;
    this.stage.querySelectorAll(".scan").forEach((e) => (e.style.left = `calc(${this.pos * 100}% - 1.5px)`));
  }

  renderButton() {
    this.btn.textContent = this.playing ? "❚❚" : "▶";
    this.btn.setAttribute("aria-label", t(this.playing ? "pause" : "play"));
  }

  destroy() { this.stop(); this.root.innerHTML = ""; }
}
