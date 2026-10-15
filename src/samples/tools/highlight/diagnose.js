import { diagnose } from "arcmoon-highlight/diagnostics";

diagnose(`[p]\${ const = 1 }$[end]
[style] .a { colr: red } [end]
runtime \${ export const x = 1; }$`);
// [
//   { line: 1, column: 13, text: "=", severity: "error", source: "JavaScript",
//     message: "Unexpected token", from: 12, to: 13 },
//   { line: 2, column: 14, text: "colr", severity: "warning", source: "CSS",
//     message: "\"colr\" is not a CSS property (did you mean \"color\"?)", from: 37, to: 41 },
//   { line: 3, column: 12, text: "export const x = 1;", severity: "error", source: "ArcMoon",
//     message: "export is not allowed in runtime code", from: 66, to: 85 }
// ]

diagnose(src, { rules: false });   // only syntax errors, not ArcMoon's rules
