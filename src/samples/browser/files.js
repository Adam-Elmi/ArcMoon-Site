import ArcMoon from "arcmoon";

const html = await new ArcMoon({
  filename: "index.arcm",
  files: {
    "index.arcm": '[import = Card: "./Card.arcm" !][Card = title: "Virtual"]Body[end]',
    "Card.arcm": '${ const { title } = ArcMoon.props(); }$[div][h3]${ title }$[end][slot!][end]'
  }
}).compile();
// <div><h3>Virtual</h3>Body</div>
