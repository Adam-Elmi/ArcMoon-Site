import ArcMoon from "arcmoon";

const am = new ArcMoon({
  src: `
    runtime \${
      import { signal } from "arcmoon/reactive";
      const count = signal(0);
    }$
    [button = onclick: runtime \${ () => count(count() + 1) }$]Clicked runtime \${ count() }$[end]
  `
});

const app = document.getElementById("app");
app.append(await am.render());   // insert it right away: runtime code starts on the next task
// clicking the button counts up
