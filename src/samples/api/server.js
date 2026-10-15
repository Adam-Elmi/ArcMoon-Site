import { createServer } from "node:http";
import ArcMoon from "arcmoon";

createServer(async (req, res) => {
  const name = new URL(req.url, "http://localhost").searchParams.get("name") ?? "guest";
  try {
    const html = await new ArcMoon({
      filename: "pages/index.arcm",
      props: { user: name }
    }).compile();
    res.writeHead(200, { "content-type": "text/html" }).end(html);
  } catch (err) {
    res.writeHead(500, { "content-type": "text/plain" }).end(err.message);
  }
}).listen(3000);

// http://localhost:3000/?name=Adam  →  <h1>Hi Adam</h1>
