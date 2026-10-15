import ArcMoon from "arcmoon";

const html = await new ArcMoon({
  src: '${ import dayjs from "dayjs"; }$[p]${ dayjs("2026-10-15").format("D MMM YYYY") }$[end]',
  packages: { dayjs: "https://esm.sh/dayjs@1.11.13" }
}).compile();
// <p>15 Oct 2026</p>
