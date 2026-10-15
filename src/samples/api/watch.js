import { watch } from "node:fs";
import ArcMoon, { loadGraph } from "arcmoon";
import { writeFile } from "node:fs/promises";

const options = { filename: "pages/index.arcm", importAliases: { "@": "./src" } };

const rebuild = async () => {
  await writeFile("dist/index.html", await new ArcMoon(options).compile());
  console.log("rebuilt");
};

// watch the page and every component it imports
const graph = await loadGraph(options);
for (const file of graph.modules.keys()) watch(file, rebuild);
await rebuild();
