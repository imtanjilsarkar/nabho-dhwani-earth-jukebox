const base = "assets/images/storms/";
export const STORMS = [
  { id: "hurricane-dorian", name: "Hurricane Dorian", place: "Category 5, Atlantic" },
  { id: "cyclone-debbie", name: "Tropical Cyclone Debbie", place: "Australia" },
  { id: "cyclone-gelane", name: "Tropical Cyclone Gelane", place: "Indian Ocean" },
  { id: "cyclone-imani", name: "Tropical Cyclone Imani", place: "Mozambique Channel" },
  { id: "cyclone-ului", name: "Tropical Cyclone Ului", place: "South Pacific" },
  { id: "cyclone-wilma", name: "Tropical Cyclone Wilma", place: "Fiji" },
].map((s) => ({ ...s, src: `${base}${s.id}.jpg` }));
