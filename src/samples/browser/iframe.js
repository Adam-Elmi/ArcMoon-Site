import ArcMoon from "arcmoon";

const html = await new ArcMoon({ src: "…" }).compile();

// show it in a frame of this page: its runtime code works there
const frame = document.querySelector("iframe");
frame.srcdoc = html;
