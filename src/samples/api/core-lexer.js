import { lexer, TOKEN_TYPES } from "arcmoon/core";

const tokens = lexer('[p = class: "x"]Hi[end]', "tiny.arcm");

tokens.length;   // 15
tokens[0];
// { type: "OPEN_BRACKET", value: "[", source: "tiny.arcm",
//   range: { start: { line: 0, character: 0 }, end: { line: 0, character: 1 } } }

// count the strings in a file
tokens.filter((t) => t.type === TOKEN_TYPES.STRING).length;   // 1
