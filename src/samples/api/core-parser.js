import { lexer, parser, NODE_TYPES } from "arcmoon/core";

const ast = parser(lexer('[p = class: "x"]Hi[end]', "tiny.arcm"));
ast[0];
// { type: "Block", id: "p", props: { class: "x" }, directives: {},
//   isSelfClosing: false, body: [{ type: "Text", text: "Hi" }] }

// count every block, however deep
const count = (nodes) =>
  nodes.reduce((n, node) => n + (node.type === NODE_TYPES.BLOCK ? 1 : 0) + count(node.body ?? []), 0);

count(parser(lexer("[ul][li]a[end][li]b[end][end]")));   // 3
