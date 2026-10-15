// ###################
// ArcMoon config for the ArcMoon site
// ###################
export default {
	importAliases: { "@": "./src" },   // [import = X: "@/components/X.arcm" !]
	outDir: "./dist",                  // "npm run build" writes here
	timeout: 30000,                    // ms per page; [Code] compiles each example with ArcMoon
	bundle: ["arcmoon-highlight"],     // npm packages runtime code may import (the playground's editors)
	externalScripts: false,            // JS and CSS inside each page, so dist/ also works from disk
	externalStyles: false
};
