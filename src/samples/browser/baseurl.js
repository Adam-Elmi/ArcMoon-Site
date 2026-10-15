import ArcMoon from "arcmoon";

// https://example.com/site/components/Card.arcm and https://example.com/site/data.json
const html = await new ArcMoon({
  src: `
    [import = Card: "./components/Card.arcm" !]
    \${ import { name } from "./data.json"; }$
    [Card = title: \${ name }$]From the server[end]
  `,
  baseUrl: "https://example.com/site/"
}).compile();
// <div class="card"><h3>Fetched site</h3>From the server</div>
