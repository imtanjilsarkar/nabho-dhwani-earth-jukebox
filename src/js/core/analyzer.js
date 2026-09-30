/** Turn an image into sound data: per-column pitch (where the bright area sits) and loudness (brightness). */
export const COLUMNS = 220;

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load ${src}`));
    img.src = src;
  });
}

export function analyze(img) {
  const w = COLUMNS, h = 140;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext("2d", { willReadFrequently: true });
  g.drawImage(img, 0, 0, w, h);
  const px = g.getImageData(0, 0, w, h).data;
  const freq = new Float32Array(w), amp = new Float32Array(w);
  for (let x = 0; x < w; x++) {
    let sum = 0, moment = 0;
    for (let y = 0; y < h; y++) {
      const i = (y * w + x) * 4;
      const b = (0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) / 255;
      sum += b;
      moment += b * y;
    }
    freq[x] = 180 + (1 - (sum > 0.001 ? moment / sum : h / 2) / (h - 1)) * 920;
    amp[x] = Math.min(1, (sum / h) * 2.2);
  }
  const mean = amp.reduce((p, v) => p + v, 0) / w;
  return { freq, amp, mean, peak: amp.indexOf(Math.max(...amp)) / w };
}
