import ArcMoon from "arcmoon";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const { html, files } = await new ArcMoon({ filename: "pages/index.arcm" }).build({
  outDir: "dist",
  externalScripts: true,
  externalStyles: true
});

await mkdir("dist", { recursive: true });
await writeFile("dist/index.html", html);
for (const file of files) {
  await mkdir(dirname(file.path), { recursive: true });
  await writeFile(file.path, file.contents);
}
