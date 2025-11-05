// ✅ Import semua tema
import { artDeco } from "./artDeco";
import { caffeine } from "./caffeine";
import { claude } from "./claude";
import { cleanSlate } from "./cleanSlate";
import { corporate } from "./corporate";
import { elegantLuxury } from "./elegantLuxury";
import { ghibliStudio } from "./ghibliStudio";
import { marshmallow } from "./marshmallow";
import { marvel } from "./marvel";
import { material } from "./material";
import { midnightBloom } from "./midnightBloom";
import { modernMinimal } from "./modernMinimal";
import { nature } from "./nature";
import { neoBrutalism } from "./neoBrutalism";
import { pastelDreams } from "./pastelDreams";
import { perplexity } from "./perplexity";
import { slack } from "./slack";
import { spotify } from "./spotify";
import { summer } from "./summer";
import { sunsetHorizon } from "./sunsetHorizon";
import { valorant } from "./valorant";
import { vscode } from "./vscode";
import { defaultTheme } from "./defaultTheme"
// 🧩 Kumpulan semua tema yang tersedia
export const themes = {
  defaultTheme,
  artDeco,
  caffeine,
  claude,
  cleanSlate,
  corporate,
  elegantLuxury,
  ghibliStudio,
  marshmallow,
  marvel,
  material,
  midnightBloom,
  modernMinimal,
  nature,
  neoBrutalism,
  pastelDreams,
  perplexity,
  slack,
  spotify,
  summer,
  sunsetHorizon,
  valorant,
  vscode,
};

export type ThemeName = keyof typeof themes;

/**
 * 🚀 Terapkan semua variabel CSS dari tema ke root element
 */
export const applyTheme = (theme: Record<string, string>) => {
  if (!theme) return;
  const root = document.documentElement;
  for (const [key, value] of Object.entries(theme)) {
    root.style.setProperty(key, value);
  }

  // Jika ada font, apply ke body
  if (theme["--font-sans"]) {
    document.body.style.fontFamily = theme["--font-sans"];
  }
};

/**
 * 🌗 Terapkan tema aktif (light/dark)
 * @param name Nama tema, contoh: "material"
 * @param mode Mode tampilan: "light" | "dark"
 */
export const setActiveTheme = (
  name: ThemeName = "material",
  mode: "light" | "dark" = "light"
) => {
  const selectedTheme = themes[name]?.[mode];

  if (!selectedTheme) {
    console.warn(`⚠️ Tema "${name}" atau mode "${mode}" tidak ditemukan.`);
    return;
  }

  // Simpan preferensi di localStorage agar persist
  localStorage.setItem("theme-name", name);
  localStorage.setItem("theme-mode", mode);

  // Terapkan tema
  applyTheme(selectedTheme);

  // Update class dark/light
  document.documentElement.classList.toggle("dark", mode === "dark");
};

/**
 * 🧠 Load tema terakhir dari localStorage (dipanggil di root layout)
 */
export const initTheme = () => {
  const name =
    (localStorage.getItem("theme-name") as ThemeName) || "defaultTheme";
  const mode = (localStorage.getItem("theme-mode") as "light" | "dark") || "light";
  setActiveTheme(name, mode);
};
