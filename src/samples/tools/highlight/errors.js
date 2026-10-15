import { staticHighlight } from "arcmoon-highlight";
import { diagnose } from "arcmoon-highlight/diagnostics";

const src = "[p]${ 1 + }$[end]";
staticHighlight(src, { errors: diagnose(src) });
// … <span style="text-decoration:underline wavy #f59e0b;…" title="JavaScript: the code ends too early">+</span> …

staticHighlight(src, { classPrefix: "arcm-", errors: diagnose(src) });
// … <span class="arcm-error arcm-error-javascript" title="JavaScript: the code ends too early">…</span> …
