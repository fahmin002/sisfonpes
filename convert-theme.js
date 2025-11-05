// convert-theme.js
import fs from "fs";

const inputFile = "./themes/defaultTheme.css"; // file CSS hasil export Shadcn Studio
const outputFile = `./resources/js/themes/${inputFile.replace("./themes/", "").replace(".css", ".ts")}`; // file TS yang akan dibuat

const css = fs.readFileSync(inputFile, "utf8");

const result = {};
let current = null;

// parsing baris demi baris
css.split("\n").forEach((line) => {
  line = line.trim();
  if (!line) return;

  // buka selector (:root atau .dark)
  if (line.endsWith("{")) {
    current = line.replace("{", "").trim();
    result[current] = {};
  }
  // baca variabel
  else if (line.startsWith("--")) {
    const [key, value] = line.replace(";", "").split(":").map((s) => s.trim());
    result[current][key] = value;
  }
});

// bentuk final
const lightVars = result[":root"] || {};
const darkVars = result[".dark"] || {};

const tsOutput = `// ⚡ Auto-generated from theme.css
export const ${inputFile.replace("./themes/", "").replace(".ts", "")} = {
  light: ${JSON.stringify(lightVars, null, 2)},
  dark: ${JSON.stringify(darkVars, null, 2)},
};
`;

fs.mkdirSync("./resources/js/themes", { recursive: true });
fs.writeFileSync(outputFile, tsOutput);
console.log("✅ Theme converted to " + outputFile);
