import { staticHighlight } from "arcmoon-highlight";

const src = "[b]Hi[end]";

// tokens: a style per token type
staticHighlight(src, {
  tokens: {
    IDENTIFIER: "#ffcc00",                    // a color
    TEXT: { color: "#22c55e", bold: true },  // color, bold, italic
    END_KEYWORD: null                        // plain text, no span
  }
});
// … <span style="color:#ffcc00">b</span> … <span style="color:#22c55e;font-weight:bold">Hi</span> … end …

// render: your own HTML for a token type
staticHighlight(src, { tokens: { TEXT: { render: (value) => `<mark>${value}</mark>` } } });

// onToken: decide for any token, with the ones around it; undefined falls through
staticHighlight(src, {
  onToken: ({ prev, current, next }) => (current.type === "IDENTIFIER" ? `<b class="tag">${current.value}</b>` : undefined)
});

// other: the style for every token type you didn't list in tokens
staticHighlight(src, { tokens: { IDENTIFIER: "#ffcc00" }, other: "#888888" });
