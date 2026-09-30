let ctx = null;

export function getContext() {
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
  ctx.resume();
  return ctx;
}
export const now = () => getContext().currentTime;

/** One short decaying tone (used for single data points). */
export function playTone(freq, { gain = 0.35, duration = 0.55 } = {}) {
  const c = getContext(), o = c.createOscillator(), g = c.createGain(), n = c.currentTime;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, n);
  g.gain.linearRampToValueAtTime(gain, n + 0.03);
  g.gain.exponentialRampToValueAtTime(0.001, n + duration);
  o.connect(g).connect(c.destination);
  o.start(n);
  o.stop(n + duration + 0.05);
}

/** A continuous, stereo-panned voice whose pitch and loudness can be steered live. */
export function createVoice(pan = 0) {
  const c = getContext(), o = c.createOscillator(), g = c.createGain(), p = c.createStereoPanner();
  g.gain.value = 0;
  p.pan.value = pan;
  o.connect(g).connect(p).connect(c.destination);
  o.start();
  return {
    set(freq, gain) {
      const n = c.currentTime;
      o.frequency.setTargetAtTime(freq, n, 0.03);
      g.gain.setTargetAtTime(gain, n, 0.03);
    },
    stop() {
      const n = c.currentTime;
      g.gain.setTargetAtTime(0, n, 0.05);
      o.stop(n + 0.4);
    },
  };
}
