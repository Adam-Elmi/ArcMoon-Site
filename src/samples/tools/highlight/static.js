import { staticHighlight } from "arcmoon-highlight";

const html = staticHighlight(`[div = class: "hero"]
  [h1]Hello[end]
[end]`);

document.querySelector("pre").innerHTML = html;
