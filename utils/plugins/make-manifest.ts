import * as fs from "fs";
import * as path from "path";
import colorLog from "../log";
import manifest, { BrowserTarget } from "../../src/manifest";
import { PluginOption } from "vite";
export { BrowserTarget };
const { resolve } = path;

const outDir = resolve(__dirname, "..", "..", "public");
export default function makeManifest(target: BrowserTarget): PluginOption {
  return {
    name: "make-manifest",
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }

      const manifestPath = resolve(outDir, "manifest.json");

      fs.writeFileSync(manifestPath, JSON.stringify(manifest(target), null, 2));

      colorLog(`Manifest file copy complete: ${manifestPath}`, "success");
    },
  };
}
