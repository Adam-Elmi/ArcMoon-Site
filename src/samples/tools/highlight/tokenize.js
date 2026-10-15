import { tokenize, defaultTokens } from "arcmoon-highlight";

tokenize('[p = class: "x"]Hi[end]');
// [{ type: "OPEN_BRACKET", value: "[" }, { type: "IDENTIFIER", value: "p" },
//  { type: "WHITESPACE", value: " " }, { type: "EQUAL", value: "=" }, …]

// the built-in dark colors: start from them and change a few
const tokens = { ...defaultTokens, IDENTIFIER: "#ffcc00" };
