import { attachHighlighter } from "arcmoon-highlight/dynamic";

const editor = attachHighlighter(document.getElementById("editor"), {
  classPrefix: "arcm-",          // or tokens / other / onToken, like staticHighlight
  caretColor: "#e8eaf0",
  showLineNumbers: true,
  showErrors: true,              // wavy lines and dots in the gutter
  rules: true,                   // also check ArcMoon's rules, not only syntax
  onDiagnostics: (list) => {},   // after every check: the full list, like diagnose()
  onError: (text) => {}          // after every check: the first problem as text, or null
});

editor.setValue("[h1]Hello[end]");
editor.getValue();                          // "[h1]Hello[end]"
editor.onUpdate((code) => save(code));      // after every change
editor.goTo({ from: 4, to: 9 });            // select, scroll there and focus
editor.view;                                // the CodeMirror EditorView, for anything else
editor.destroy();                           // remove it
