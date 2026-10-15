// ###################
// The latest version of a package on npm, read while the site builds;
// the installed one if npm can't be reached, or null
// ###################
import { readFile } from "node:fs/promises";

export const latest = async (name) => {
	try {
		const res = await fetch(`https://registry.npmjs.org/${name}/latest`, { signal: AbortSignal.timeout(3000) });
		if (res.ok) return (await res.json()).version;
	} catch {}
	try {
		return JSON.parse(await readFile(`node_modules/${name}/package.json`, "utf8")).version;
	} catch {
		return null;
	}
};
