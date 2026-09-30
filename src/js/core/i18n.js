const dict = {
  en: {
    skip: "Skip to content",
    title: "Earth science you can hear.",
    lede: "NASA satellite images and climate data, turned into sound in your browser. Designed for blind and low-vision learners.",
    footer: "NabhoDhawni · NASA Space Apps Challenge 2026 — The Earth Information Jukebox. Imagery: NASA Earth Observatory. Keys: Space play/pause, ← → step, 1–3 modes, N narration.",
    "tab.storms": "Storms", "tab.then": "Then & Now", "tab.temp": "Temperature",
    play: "Play", pause: "Pause", prev: "Previous year", next: "Next year", year: "Year",
    "voice.on": "Narration: on", "voice.off": "Narration: off", "lang.switch": "বাংলা", "lang.aria": "Switch language to Bangla",
    left: "left", center: "center", right: "right", heavy: "heavy", moderate: "moderate", light: "light",
    summary: "Brightest area is toward the {pos}. Overall brightness is {level}.",
    "cmp.quieter": "The right ear, now, is quieter than the left ear, before.",
    "cmp.louder": "The right ear, now, is louder than the left ear, before.",
    "cmp.same": "Both ears sound similar.",
    "temp.line": "{year}. {value} degrees Celsius compared with the 1951 to 1980 average. {trend}",
    "trend.start": "Start of the record.", "trend.up": "Higher than the previous point.",
    "trend.down": "Lower than the previous point.", "trend.same": "About the same as the previous point.",
    "aral.title": "Aral Sea", "aral.note": "Illustrative before and now pair. Swap in NASA World of Change images.",
    before: "Before", now: "Now",
    "how.storms": "Sound sweeps the image from left to right. Higher pitch means the bright area is higher in the picture. Louder means brighter.",
    "how.then": "Use headphones. The left ear is before, the right ear is now. Louder means more bright surface, such as water or ice.",
    "how.temp": "Each tone is one year. Higher pitch means a warmer year. Use the arrow keys to move between years.",
  },
  bn: {
    skip: "মূল অংশে যান",
    title: "যে পৃথিবীকে শোনা যায়।",
    lede: "নাসার স্যাটেলাইট ছবি ও জলবায়ু তথ্য, ব্রাউজারেই শব্দে রূপান্তরিত। দৃষ্টিপ্রতিবন্ধী শিক্ষার্থীদের জন্য তৈরি।",
    footer: "NabhoDhawni · NASA Space Apps Challenge 2026 — The Earth Information Jukebox। ছবি: NASA Earth Observatory। কী: Space চালান/থামান, ← → বছর বদলান, ১–৩ মোড, N বর্ণনা।",
    "tab.storms": "ঝড়", "tab.then": "আগে ও এখন", "tab.temp": "তাপমাত্রা",
    play: "চালান", pause: "থামান", prev: "আগের বছর", next: "পরের বছর", year: "বছর",
    "voice.on": "বর্ণনা: চালু", "voice.off": "বর্ণনা: বন্ধ", "lang.switch": "English", "lang.aria": "Switch language to English",
    left: "বাম", center: "মাঝ", right: "ডান", heavy: "বেশি", moderate: "মাঝারি", light: "কম",
    summary: "সবচেয়ে উজ্জ্বল অংশ {pos} দিকে। সামগ্রিক উজ্জ্বলতা {level}।",
    "cmp.quieter": "ডান কানের এখনকার শব্দ বাম কানের আগের শব্দের চেয়ে নিচু।",
    "cmp.louder": "ডান কানের এখনকার শব্দ বাম কানের চেয়ে জোরালো।",
    "cmp.same": "দুই কানের শব্দ প্রায় একই।",
    "temp.line": "{year} সাল। ১৯৫১ থেকে ১৯৮০ সালের গড়ের তুলনায় {value} ডিগ্রি সেলসিয়াস। {trend}",
    "trend.start": "রেকর্ডের শুরু।", "trend.up": "আগের পয়েন্টের চেয়ে বেশি।",
    "trend.down": "আগের পয়েন্টের চেয়ে কম।", "trend.same": "আগের পয়েন্টের প্রায় সমান।",
    "aral.title": "আরাল সাগর", "aral.note": "উদাহরণ হিসেবে আগে ও এখনের ছবি। নাসার World of Change-এর ছবি দিয়ে বদলান।",
    before: "আগে", now: "এখন",
    "how.storms": "শব্দ ছবির বাঁ থেকে ডানে চলে। সুর উঁচু মানে উজ্জ্বল অংশ ছবির ওপরে। জোরালো শব্দ মানে বেশি উজ্জ্বল।",
    "how.then": "হেডফোন ব্যবহার করুন। বাম কানে আগের ছবি, ডান কানে এখনকার ছবি। জোরালো শব্দ মানে উজ্জ্বল অংশ বেশি।",
    "how.temp": "প্রতিটি সুর একটি বছর। উঁচু সুর মানে উষ্ণ বছর। বছর বদলাতে তীর কী ব্যবহার করুন।",
  },
};

let lang = "en";
export const getLang = () => lang;
export function setLang(l) {
  lang = l;
  document.documentElement.lang = l;
}
export function t(key, vars = {}) {
  const s = dict[lang][key] ?? dict.en[key] ?? key;
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}
export function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
}
