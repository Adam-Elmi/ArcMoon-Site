// ###################
// The site search's table of contents (Contents.arcm): every docs page with its sections,
// the [Title = id: …] headings in its file (size 2 only; inline blocks like
// [hl = text: "…" !] keep their text). Links start from root, so any page can show it
// ###################

import { existsSync, readFileSync } from "node:fs";

const docs = JSON.parse(readFileSync(new URL("../data/docs.json", import.meta.url), "utf8"));

const sectionsOf = (page, href) => {
	const file = new URL(`../../pages/docs/${page}.arcm`, import.meta.url);
	if (!existsSync(file)) return [];
	const source = readFileSync(file, "utf8");
	return [...source.matchAll(/\[Title\s*=([^\]]*)\]([\s\S]*?)\[end:Title\]/g)]
		.map(([, props, text]) => ({ id: props.match(/id:\s*"([^"]+)"/)?.[1], size: Number(props.match(/size:\s*(\d)/)?.[1] ?? 2), text }))
		.filter((h) => h.id && h.size === 2)
		.map((h) => ({
			// escaped \[ stays text: set it aside, drop the blocks, then unescape \[ \] \# …
			title: h.text
				.replace(/\\\[/g, "\u0000")
				.replace(/\[[^\]]*?text:\s*"([^"]*)"[^\]]*\]/g, "$1")
				.replace(/\[[^\]]*\]/g, "")
				.replace(/\u0000/g, "[")
				.replace(/\\([\]#:,=])/g, "$1")
				.trim(),
			href: `${href}#${h.id}`
		}));
};

// root: the path to the site root ("" on the home page, "../" in docs/); current: the docs page shown, if any
export const docsContents = (root = "", current = null) =>
	docs.map((g) => ({
		label: g.group,
		items: g.pages.map((p) => {
			const href = `${root}docs/${p.slug}.html`;
			return { title: p.title, href, text: p.summary, current: p.slug === current, sections: sectionsOf(p.slug, href) };
		})
	}));
