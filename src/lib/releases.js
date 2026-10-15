// ###################
// Releases: one .arcm file per version in pages/versions/. Each file is that release's page.
// Its [Release = version, date, summary] and [Change = kind, title, text] blocks are read
// with ArcMoon's own parser (nothing runs), so the version panel can compare any two releases
// ###################
import { readdirSync, readFileSync } from "node:fs";
import { lexer, parser } from "arcmoon/core";

export const DIR = "pages/versions";
export const KINDS = [
  { id: "breaking", label: "Breaking changes", one: "breaking change" },
  { id: "feature", label: "New features", one: "new feature" },
  { id: "improvement", label: "Improvements", one: "improvement" },
  { id: "fix", label: "Bugs fixed", one: "bug fixed" }
];

// ###################
// "1.10.0" after "1.9.0": compare numbers, not text
// ###################
export const byVersion = (a, b) => {
  const x = a.split(".").map(Number), y = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] - y[i];
  return 0;
};

// ###################
// A title as an anchor: "css.hover props" → "css-hover-props"
// ###################
export const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// ###################
// `code` in a line of text → pieces to draw: [{ text, code }]
// ###################
export const pieces = (text = "") => text.split(/(`[^`]+`)/).filter(Boolean).map((t) => (t.startsWith("`") ? { text: t.slice(1, -1), code: true } : { text: t, code: false }));

const blocks = (nodes, id, out = []) => {
  for (const node of nodes ?? []) {
    if (node.type === "Block" && node.id === id) out.push(node);
    if (node.body) blocks(node.body, id, out);
  }
  return out;
};

// ###################
// Every release, oldest first
// ###################
export const loadReleases = () => {
  const kinds = new Set(KINDS.map((k) => k.id));
  const list = readdirSync(DIR).filter((f) => /^\d+\.\d+\.\d+\.arcm$/.test(f)).map((file) => {
    const ast = parser(lexer(readFileSync(`${DIR}/${file}`, "utf8")));
    const release = blocks(ast, "Release")[0];
    if (!release) throw new Error(`${DIR}/${file} has no [Release] block`);
    const { version, date = "", summary = "" } = release.props;
    if (`${version}.arcm` !== file) throw new Error(`${DIR}/${file}: [Release = version: "${version}"] doesn't match the file name`);
    const changes = blocks(release.body, "Change").map((c) => {
      const { kind, title, text = "" } = c.props;
      if (!kinds.has(kind)) throw new Error(`${DIR}/${file}: kind "${kind}" on "${title}" must be one of ${[...kinds].join(", ")}`);
      return { kind, title, text, id: slug(title), version };
    });
    return { version, date, summary, changes, page: `${version}.html` };
  });
  return list.sort((a, b) => byVersion(a.version, b.version));
};
