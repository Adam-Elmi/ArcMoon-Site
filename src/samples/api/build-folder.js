import { buildPages } from "arcmoon";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

// every .arcm file in pages/, like "arcm build pages"
const names = (await readdir("pages")).filter((f) => f.endsWith(".arcm"));
const { pages, files } = await buildPages(
  names.map((f) => ({ filename: `pages/${f}` })),
  { outDir: "dist", externalScripts: true, externalStyles: true }
);

await mkdir("dist", { recursive: true });
for (const page of pages) await writeFile(`dist/${page.name}.html`, page.html);
for (const file of files) {
  await mkdir(dirname(file.path), { recursive: true });
  await writeFile(file.path, file.contents);
}
console.log(pages.map((p) => p.name).join(", "), "+", files.length, "files");
