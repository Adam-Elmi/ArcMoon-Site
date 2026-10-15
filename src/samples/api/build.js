import { buildPages } from "arcmoon";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const posts = [
  { slug: "hello", title: "Hello", body: "The first post." },
  { slug: "loops", title: "Loops", body: "How [for-each] works." }
];

const { pages, files } = await buildPages(
  posts.map((post) => ({ filename: "templates/Post.arcm", name: post.slug, props: post })),
  { outDir: "dist" }
);

for (const page of pages) {
  await mkdir("dist", { recursive: true });
  await writeFile(join("dist", `${page.name}.html`), page.html);
}
for (const file of files) {
  await mkdir(dirname(file.path), { recursive: true });
  await writeFile(file.path, file.contents);
}
console.log("wrote", pages.map((p) => p.name + ".html").join(", "), "and", files.length, "files");
