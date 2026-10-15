import { loadModules, unknownTags, COMPONENT } from "arcmoon/core";

// files kept in memory: a page and a component
const files = {
  "/page.arcm": '[import = Card: "./Card.arcm" !][Card!][dvi]x[end]',
  "/Card.arcm": "[b]Card[end]"
};

// the host tells loadModules how to find and read files
const host = {
  resolve: (path, from) => new URL(path, "file://" + from).pathname,
  readFile: async (id) => files[id]
};

const graph = await loadModules({ id: "/page.arcm", src: files["/page.arcm"] }, host);

[...graph.modules.keys()];                  // ["/Card.arcm", "/page.arcm"]
const page = graph.modules.get("/page.arcm");
page.imports;                               // Map { "Card" => "/Card.arcm" }
page.ast[1].type === COMPONENT;             // true: [Card!] became a component node
page.ast[1];
// { type: "Component", name: "Card", module: "/Card.arcm", props: {}, … }

unknownTags(graph);
// [{ source: "/page.arcm", position: { line: 0, character: 39 },
//    message: "[dvi] is not an HTML element or an imported component (did you mean [div]?)" }]
